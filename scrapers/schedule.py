import requests
import json
from datetime import datetime, timedelta


def get_week_num(date):
    start_date = datetime.strptime('2022-10-17', '%Y-%m-%d')
    weeks = [start_date]
    for i in range(0, 25):
        start_date += timedelta(days=7)
        weeks.append(start_date)

    for i in range(0, len(weeks) - 1):
        if weeks[i] <= date < weeks[i + 1]:
            return i + 1
    return 0


def get_schedule():
    r = requests.get("https://data.nba.com/data/10s/v2015/json/mobile_teams/nba/2022/league/00_full_schedule.json")
    raw_schedule = json.loads(r.text)

    # process schedule
    games_list = []
    for month in raw_schedule['lscd']:
        games = month['mscd']['g']
        for game in games:
            games_list.append({
                'date': datetime.strptime(game['gdte'], '%Y-%m-%d'),
                'week': get_week_num(datetime.strptime(game['gdte'], '%Y-%m-%d')),
                'v': game['v']['ta'],
                'h': game['h']['ta']
            })

    game_day_games = {}
    for game in games_list:
        date = game['date']
        if date not in game_day_games.keys():
            game_day_games[date] = [game]
        else:
            game_day_games[date].append(game)

    team_quality_games = {}
    team_games = {}
    QUALITY_GAME_THRESHOLD = 8
    for day in game_day_games.keys():
        day_games = game_day_games[day]
        week = day_games[0]['week']
        for game in day_games:
            for team in [game['v'], game['h']]:
                if len(day_games) < QUALITY_GAME_THRESHOLD:
                    if team not in team_quality_games.keys():
                        team_quality_games[team] = [0] * 26
                    team_quality_games[team][week] += 1

                if team not in team_games.keys():
                    team_games[team] = [0] * 26
                team_games[team][week] += 1

    team_games['OKL'] = team_games['OKC']
    team_games['BRO'] = team_games['BKN']
    team_quality_games['OKL'] = team_quality_games['OKC']
    team_quality_games['BRO'] = team_quality_games['BKN']

    return {
        'games': team_games,
        'quality_games': team_quality_games
    }
    # for key in team_quality_games.keys():
    #     print(f"{key}: {team_games[key][22]}-{team_games[key][23]}-{team_games[key][24]}, {team_quality_games[key][22]}-{team_quality_games[key][23]}-{team_quality_games[key][24]}")

