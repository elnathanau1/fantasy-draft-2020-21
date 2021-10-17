from bs4 import BeautifulSoup
import requests
import json
import csv

ESPN_API_URL = "https://fantasy.espn.com/apis/v3/games/fba/seasons/2022/segments/0/leaguedefaults/1?view=kona_player_info"
HASHTAG_RANKINGS_URL = "https://hashtagbasketball.com/fantasy-basketball-projections"
CNN_INJURIES_URL = "https://www.cbssports.com/nba/injuries/"


def pull_data_espn():
    # grab the page - note verify=False is not safe
    headers = {
        'x-fantasy-filter': '{"players":{"filterSlotIds":{"value":[0,1,2,3,4,5,6,7,8,9,10,11]},"limit":1013,"offset":0,"sortAdp":{"sortAsc":true,"sortPriority":1},"sortDraftRanks":{"sortPriority":100,"sortAsc":true,"value":"STANDARD"},"filterRanksForScoringPeriodIds":{"value":[1]},"filterRanksForRankTypes":{"value":["STANDARD"]},"filterStatsForTopScoringPeriodIds":{"value":5,"additionalValue":["002021","102021","002020","012021","022021","032021","042021"]}}}'}
    page = requests.get(ESPN_API_URL, headers=headers)
    players_json = json.loads(page.text)

    player_list = []
    for player in players_json['players']:
        try:
            name = player['player']["fullName"].replace(".", "")
            rank = player['player']["draftRanksByRankType"]["STANDARD"]["rank"]
            adp = player['player']["ownership"]["averageDraftPosition"]
            eligibleSlots = player['player']['eligibleSlots']

            slotToPosition = {
                0: 'PG',
                1: 'SG',
                2: 'SF',
                3: 'PF',
                4: 'C'
            }
            positions = []
            for slot in slotToPosition.keys():
                if slot in eligibleSlots:
                    positions.append(slotToPosition[slot])

            formatted_data = [rank, name, adp, positions]
            player_list.append(tuple(formatted_data))
        except:
            continue

    return player_list


def pull_data_hashtag_zscores():
    # grab the page - note verify=False is not safe
    page = requests.get(HASHTAG_RANKINGS_URL)

    soup = BeautifulSoup(page.content, 'html.parser')
    players_div = soup.findAll("div", {"class": "table-responsive"})[2]
    rankings_table = players_div.findAll("tr")

    player_list = []
    for i in range(0, len(rankings_table)):
        row = rankings_table[i]
        td = row.findAll("td")
        if len(td) == 0:
            continue
        else:
            rank = td[0].text.strip()
            if rank != "R#":
                # unspan the tags that have it (not all of them do)
                formatted_data = [""] * 14
                formatted_data[0] = rank
                k = 1
                for j in range(0, len(td)):
                    if td[j].find("span") is not None and td[j].find("input") is None:
                        if k < len(formatted_data) - 1:  # so that we don't pull total, we'll calculate that ourselves
                            formatted_data[k] = td[j].find("span").text.strip()
                            k += 1

                    elif len(td[j].findAll("input")) == 2:
                        if k < len(formatted_data) - 1:
                            formatted_data[k] = td[j].findAll("input")[1]['value'].strip()
                            k += 1
                tip = row.find("span", {"class": "tip-content"})
                if tip is not None:
                    formatted_data[12] = tip.text.strip()
                else:
                    formatted_data[12] = ''

                player_page_url = 'https://hashtagbasketball.com' + row.find('a')['href']
                player_page = requests.get(player_page_url)
                player_page_soup = BeautifulSoup(player_page.content, 'html.parser')
                progress_bar = player_page_soup.find('div', {'class': 'progress-bar'})
                if progress_bar is not None:
                    formatted_data[13] = progress_bar.text.strip()
                else:
                    formatted_data[13] = ''

                player_list.append(tuple(formatted_data))
                print(formatted_data[2])

    return player_list


def pull_data_cnn_injuries():
    page = requests.get(CNN_INJURIES_URL)

    soup = BeautifulSoup(page.content, 'html.parser')
    page_content = soup.find('div', {'class': 'Page-content'})
    all_tr = page_content.findAll('tr', {'class': 'TableBase-bodyTr'})

    player_list = []
    for tr in all_tr:
        full_name = tr.find('span', {'class': 'CellPlayerName--long'}).text.strip().replace(".", "")
        injury = tr.findAll('td')[-1].text.strip()

        player_list.append(tuple([full_name, injury]))

    return player_list


def combined_rankings(espn_rankings, hashtag_rankings_zscore, cnn_injuries):
    player_list = []
    for player in hashtag_rankings_zscore:
        rank = player[0]
        player_name = player[2].replace(".", "")
        fg = round(float(player[3]), 2)
        ft = round(float(player[4]), 2)
        three = round(float(player[5]), 2)
        pts = round(float(player[6]), 2)
        reb = round(float(player[7]), 2)
        ast = round(float(player[8]), 2)
        stl = round(float(player[9]), 2)
        blk = round(float(player[10]), 2)
        to = round(float(player[11]), 2) * -1.0
        tip = player[12]
        consistency = player[13]

        espn_player = next((x for x in espn_rankings if x[1] == player_name), [500, "", 150, []])
        espn_rank = espn_player[0]
        espn_adp = round(float(espn_player[2]), 2)
        espn_positions = espn_player[3]

        cnn_player = next((x for x in cnn_injuries if x[0] == player_name), ["", ""])
        injury = cnn_player[1]

        player_list.append({
            'rank': rank,
            'name': player_name,
            'espn_rank': espn_rank,
            'espn_adp': espn_adp,
            'fg': fg,
            'ft': ft,
            'three': three,
            'pts': pts,
            'reb': reb,
            'ast': ast,
            'stl': stl,
            'blk': blk,
            'to': to,
            'tip': tip,
            'injury': injury,
            'positions': espn_positions,
            'consistency': consistency
        })

    return player_list


def outputJson(combined_rankings):
    with open('rankings.json', 'w+') as outfile:
        json.dump(combined_rankings, outfile)


if __name__ == '__main__':
    espn_rankings = pull_data_espn()
    hashtag_rankings_zscore = pull_data_hashtag_zscores()
    cnn_injuries = pull_data_cnn_injuries()

    combined_rankings = combined_rankings(espn_rankings, hashtag_rankings_zscore, cnn_injuries)

    outputJson(combined_rankings)

    # with open('rankings.csv', 'w+') as file:
    #     csv_writer = csv.writer(file, delimiter=',')
    #     csv_writer.writerows(combined_rankings)
