import React, { Component } from "react";
import ReactDOM from "react-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBRow, MDBCol, MDBDataTable, MDBBtn, MDBInput, MDBTooltip, MDBTable, MDBTableHead, MDBTableBody, MDBIcon} from "mdbreact";
import "./index.css";

class App extends Component {
  defaultSettings = {
    modal_team_overview : false,
    modal_team_ranks : false,
    modal_tiers_pg : false,
    modal_tiers_sg : false,
    modal_tiers_sf : false,
    modal_tiers_pf : false,
    modal_tiers_c : false,
    rankings : [],
    multiplier : {
      fg : 1.0,
      ft : 1.0,
      three : 1.0,
      pts : 1.25,
      ast : 1.0,
      reb : 1.0,
      stl : 1.0,
      blk : 1.0,
      to : 0.25
    },
    team_totals : [
      { team: [], draft_pos: 1, name : "Big Wong", totals : { fg : 0, ft : 0, three : 0, pts : 0, reb : 0, ast : 0, stl : 0, blk : 0, to : 0 }, rank : { fg : 0, ft : 0, three : 0, pts : 0, reb : 0, ast : 0, stl : 0, blk : 0, to : 0 }},
      { team: [], draft_pos: 2, name : "LigMA Ballyers", totals : { fg : 0, ft : 0, three : 0, pts : 0, reb : 0, ast : 0, stl : 0, blk : 0, to : 0 }, rank : { fg : 0, ft : 0, three : 0, pts : 0, reb : 0, ast : 0, stl : 0, blk : 0, to : 0 }},
      { team: [], draft_pos: 3, name : "Team Git JLin back", totals : { fg : 0, ft : 0, three : 0, pts : 0, reb : 0, ast : 0, stl : 0, blk : 0, to : 0 }, rank : { fg : 0, ft : 0, three : 0, pts : 0, reb : 0, ast : 0, stl : 0, blk : 0, to : 0 }},
      { team: [], draft_pos: 4, name : "Team Jif", totals : { fg : 0, ft : 0, three : 0, pts : 0, reb : 0, ast : 0, stl : 0, blk : 0, to : 0 }, rank : { fg : 0, ft : 0, three : 0, pts : 0, reb : 0, ast : 0, stl : 0, blk : 0, to : 0 }},
      { team: [], draft_pos: 5, name : "Flat Earthlings", totals : { fg : 0, ft : 0, three : 0, pts : 0, reb : 0, ast : 0, stl : 0, blk : 0, to : 0 }, rank : { fg : 0, ft : 0, three : 0, pts : 0, reb : 0, ast : 0, stl : 0, blk : 0, to : 0 }},
      { team: [], draft_pos: 6, name : "RIP KOBE MELO = GOAT", totals : { fg : 0, ft : 0, three : 0, pts : 0, reb : 0, ast : 0, stl : 0, blk : 0, to : 0 }, rank : { fg : 0, ft : 0, three : 0, pts : 0, reb : 0, ast : 0, stl : 0, blk : 0, to : 0 }},
      { team: [], draft_pos: 7, name : "Hoop Squad", totals : { fg : 0, ft : 0, three : 0, pts : 0, reb : 0, ast : 0, stl : 0, blk : 0, to : 0 }, rank : { fg : 0, ft : 0, three : 0, pts : 0, reb : 0, ast : 0, stl : 0, blk : 0, to : 0 }},
      { team: [], draft_pos: 8, name : "Team Au", totals : { fg : 0, ft : 0, three : 0, pts : 0, reb : 0, ast : 0, stl : 0, blk : 0, to : 0 }, rank : { fg : 0, ft : 0, three : 0, pts : 0, reb : 0, ast : 0, stl : 0, blk : 0, to : 0 }},
      { team: [], draft_pos: 9, name : "Team Wood", totals : { fg : 0, ft : 0, three : 0, pts : 0, reb : 0, ast : 0, stl : 0, blk : 0, to : 0 }, rank : { fg : 0, ft : 0, three : 0, pts : 0, reb : 0, ast : 0, stl : 0, blk : 0, to : 0 }},
      { team: [], draft_pos: 10, name : "Brick", totals : { fg : 0, ft : 0, three : 0, pts : 0, reb : 0, ast : 0, stl : 0, blk : 0, to : 0 }, rank : { fg : 0, ft : 0, three : 0, pts : 0, reb : 0, ast : 0, stl : 0, blk : 0, to : 0 }},
      { team: [], draft_pos: 11, name : "Team JON", totals : { fg : 0, ft : 0, three : 0, pts : 0, reb : 0, ast : 0, stl : 0, blk : 0, to : 0 }, rank : { fg : 0, ft : 0, three : 0, pts : 0, reb : 0, ast : 0, stl : 0, blk : 0, to : 0 }},
      { team: [], draft_pos: 12, name : "Team Orr", totals : { fg : 0, ft : 0, three : 0, pts : 0, reb : 0, ast : 0, stl : 0, blk : 0, to : 0 }, rank : { fg : 0, ft : 0, three : 0, pts : 0, reb : 0, ast : 0, stl : 0, blk : 0, to : 0 }}
    ],
    tiers : {
      pg : [],
      sg : [],
      sf : [],
      pf : [],
      c : [],
    },
    overall_position : 0,
    position : 1,
    direction : "FORWARD",
    last_player_drafted : ''
  }

  constructor(props) {
    super(props);

    if (localStorage.getItem('state') !== null) {
    console.log(localStorage.getItem('state'));
      this.state = JSON.parse(localStorage.getItem('state'));
      console.log(this.state);
    }
    else {
        this.state = this.defaultSettings;
    }
  }

  positions = ['pg', 'sg', 'sf', 'pf', 'c'];
  stat_fields = [ "fg" , "ft", "three", 'pts', 'reb', 'ast', 'stl', 'blk', 'to' ];

  skippedPlayer = {
    "rank" : 200,
    "name" : "Skipped",
    "tip" : '',
    "injury" : '',
    "position" : '',
    "espn_adp" : 200,
    "fg" : -0.3,
    "ft" : -0.3,
    "three" : -0.3,
    "pts" : -0.3,
    "reb" : -0.3,
    "ast" : -0.3,
    "stl" : -0.3,
    "blk" : -0.3,
    "to" : -0.3,
    "gp" : 0
  }

  componentDidMount() {
    this.fillTierList();
    this.resetRankings();
  }

  newDraft = () => {
    this.state = this.defaultSettings;
    this.fillTierList();
    this.resetRankings();
//    localStorage.setItem('state', this.toLocalStorage())
  }

  toLocalStorage = () =>  {
    let newState = this.state;
    newState['rankings'] = [];
    console.log(newState['overall_position']);
    return JSON.stringify(newState);
  }


  fillTierList = () => {
    let newTiersState = {};
    this.positions.forEach( pos => {
      let json = require("./tiers_" + pos + ".json");
      let newTiers = [];
      json.tiers.forEach( tier => {
        let newTier = [];
        tier.forEach( player => {
          if (!this.isDrafted(player)) {
            newTier.push(player);
          }
        });

        newTiers.push(newTier);
      })
      newTiersState[pos] = newTiers;
    })

    this.setState({
      tiers : newTiersState
    })

  }

  handleInputChange = inputName => value => {
    this.setState({
      multiplier : {
        ...this.state.multiplier,
        [inputName] : value
      }
    }, this.resetRankings);
  };

  isDrafted = name => {
    for (var i = 0; i < this.state.team_totals.length; i++) {
      var team = this.state.team_totals[i].team;
      for (var j = 0; j < team.length; j++) {
        if (team[j].name.toLowerCase() == name.toLowerCase()) {
          return true;
        }
      }
    }
    return false;
  }

  nextDraftPos = () => {
    if (this.state.direction == "FORWARD" && this.state.position == 12) {
      this.setState({
        overall_position : this.state.overall_position + 1,
        direction : "BACKWARD"
      }, this.resetRankings)
    }
    else if (this.state.direction == "BACKWARD" && this.state.position == 1) {
      this.setState({
        overall_position : this.state.overall_position + 1,
        direction : "FORWARD"
      }, this.resetRankings)
    }
    else if(this.state.direction == "FORWARD") {
      this.setState({
        overall_position : this.state.overall_position + 1,
        position : this.state.position + 1
      }, this.resetRankings)
    }
    else if(this.state.direction == "BACKWARD") {
      this.setState({
        overall_position : this.state.overall_position + 1,
        position : this.state.position - 1
      }, this.resetRankings)
    }

  }


  handleClickDraft = player => () => {
    this.draftPlayer(player);
//    localStorage.setItem('state', this.toLocalStorage());
  }

  skipPlayer = () => {
    this.draftPlayer(this.skippedPlayer)
//    localStorage.setItem('state', this.toLocalStorage());
  }


  draftPlayer = player => {
    var teamIndex = this.state.team_totals.map( e => e.draft_pos ).indexOf(this.state.position);
    var newTeamTotals = this.state.team_totals;
    newTeamTotals[teamIndex].team.push(player);

    for (var i = 0; i < this.stat_fields.length; i++) {
      var field = this.stat_fields[i];
      var total = 0;
      newTeamTotals[teamIndex].team.forEach( player => { total += player[field] });
      newTeamTotals[teamIndex]['totals'][field] = Math.round(total / newTeamTotals[teamIndex].team.length * 100)/100;
    }

    for (var i = 0; i < this.stat_fields.length; i++) {
      var field = this.stat_fields[i];
      newTeamTotals.sort((a, b) => (a.totals[field] <= b.totals[field]) ? 1 : -1);
      for (var j = 0; j < newTeamTotals.length; j++) {
        newTeamTotals[j]['rank'][field] = j+1;
      }
    }

    this.setState({
      team_totals : newTeamTotals,
      last_player_drafted : player.name
    }, () => {
      this.nextDraftPos();
      this.fillTierList();
    })
  }

  displayTip = tip => {
    if (tip != "" && tip != "Game Time Decision") {
      return (
        <MDBTooltip placement="left" component="span" tooltipContent={tip}>
          <MDBIcon far icon="plus-square" />
        </MDBTooltip>
      );
    }
    else {
      return null;
    }
  }

  resetRankings = () => {
    let rankingsJson = require('./rankings.json');
    var newRankings = [];
    for (var i = 0; i < rankingsJson.length; i++) {
      var total = 0;
      for (var key in this.state.multiplier) {
        total += (rankingsJson[i][key] * this.state.multiplier[key]);
      };

      newRankings.push( {
        punt_rank : 0,
        rank : parseInt(rankingsJson[i].rank),
        name : rankingsJson[i].name,
        injury : this.displayTip(rankingsJson[i].injury),
        position : rankingsJson[i].positions.toString(),
        espn_adp : rankingsJson[i].espn_adp,
        gp: rankingsJson[i].gp,
        fg : rankingsJson[i].fg,
        ft : rankingsJson[i].ft,
        three : rankingsJson[i].three,
        pts : rankingsJson[i].pts,
        reb : rankingsJson[i].reb,
        ast : rankingsJson[i].ast,
        stl : rankingsJson[i].stl,
        blk : rankingsJson[i].blk,
        to : rankingsJson[i].to,
        total : Math.round(total * 100)/100,
        consistency: rankingsJson[i].consistency,
        draft : <MDBTooltip placement="left" component="span" tooltipContent={rankingsJson[i].tip}><MDBBtn size="sm" onClick={this.handleClickDraft(rankingsJson[i])}>Draft</MDBBtn></MDBTooltip>
      });
    }

    newRankings.sort((a, b) => (a.total <= b.total) ? 1 : -1);

    var removedDrafted = [];
    for (var i = 0; i < newRankings.length; i++) {
      var player = newRankings[i];
      if ( !this.isDrafted(player.name) ) {
        player["punt_rank"] = i + 1;
        removedDrafted.push(player);
      }
    }

    this.setState( { rankings : removedDrafted } , localStorage.setItem('state', this.toLocalStorage()));

  }

  toggleModal = name => () => {
    var field = "modal_" + name;
    this.setState({
      [field] : !this.state[field]
    });
  };

  render() {
    const dataColumns = [
      { label: 'PR' , field: 'punt_rank'},
      { label: 'R' , field: 'rank'},
      { label: 'Name' , field: 'name'},
      { label: '', field: 'injury' },
      { label: '', field: 'position'},
      { label: 'ADP', field: 'espn_adp' },
      { label: 'GP' , field: 'gp'},
      { label: 'FG%' , field: 'fg'},
      { label: 'FT%' , field: 'ft'},
      { label: '3PM' , field: 'three'},
      { label: 'PTS' , field: 'pts'},
      { label: 'REB' , field: 'reb'},
      { label: 'AST' , field: 'ast'},
      { label: 'STL' , field: 'stl'},
      { label: 'BLK' , field: 'blk'},
      { label: 'TO' , field: 'to'},
      { label: 'TOTAL', field: 'total' }
    ];

    const modalColumns = [
      { label: 'Team' , field: 'name'},
      { label: 'FG%' , field: 'fg'},
      { label: 'FT%' , field: 'ft'},
      { label: '3PM' , field: 'three'},
      { label: 'PTS' , field: 'pts'},
      { label: 'REB' , field: 'reb'},
      { label: 'AST' , field: 'ast'},
      { label: 'STL' , field: 'stl'},
      { label: 'BLK' , field: 'blk'},
      { label: 'TO' , field: 'to'}
    ];

    const positions = [
      { name : 'Point Guard', abbreviation : 'pg' },
      { name : 'Shooting Guard', abbreviation : 'sg' },
      { name : 'Small Forward', abbreviation : 'sf' },
      { name : 'Power Forward', abbreviation : 'pf' },
      { name : 'Center', abbreviation : 'c' }
    ];

  return (
      <React.Fragment>
      <MDBContainer className="overall-container">
        <MDBRow>
        <MDBCol className="padded-right" xs>
          <MDBRow>
            {positions.map((item, index) => (
              <MDBBtn size="sm" color="secondary" onClick={this.toggleModal("tiers_" + item.abbreviation)}>{item.name}</MDBBtn>
            ))}
            <MDBBtn size="sm" color="dark" onClick={this.skipPlayer}>Skip</MDBBtn>
          </MDBRow>
          <MDBDataTable
            autoWidth
            hover
            striped
            bordered
            hover
            small
            entries={50}
            info={false}
            order={['total', 'desc']}
            data={ {columns : dataColumns, rows : this.state.rankings } }
            refresh={this.state.rankings}
            />
          <MDBBtn onClick={ this.newDraft }>New Draft</MDBBtn>
        </MDBCol>
        <MDBCol xs>
          Current Team: <br /> <b>{this.state.team_totals[this.state.team_totals.map( e => e.draft_pos ).indexOf(this.state.position)].name}</b> <br />
        Round: {(Math.floor(this.state.overall_position/12) + 1)}, Pick: {this.state.overall_position % 12 + 1} - (#{this.state.overall_position + 1})<br />
          Last drafted: {this.state.last_player_drafted}<br />
        <MDBBtn color="info" size="sm" onClick={ this.toggleModal("team_overview") }>Team Overview</MDBBtn>
        <MDBBtn color="info" size="sm" onClick={ this.toggleModal("team_ranks") }>Team Ranks</MDBBtn>
          <form className="mx-3 grey-text">
            <MDBInput
              name="FG%"
              label="fg%"
              group
              type="number"
              valueDefault={this.state.multiplier.fg}
              getValue={this.handleInputChange("fg")}
            />
            <MDBInput
              name="FT%"
              label="ft%"
              group
              type="number"
              valueDefault={this.state.multiplier.ft}
              getValue={this.handleInputChange("ft")}
            />
            <MDBInput
              name="3PM"
              label="3pm"
              group
              type="number"
              valueDefault={this.state.multiplier.three}
              getValue={this.handleInputChange("three")}
            />
            <MDBInput
              name="PTS"
              label="pts"
              group
              type="number"
              valueDefault={this.state.multiplier.pts}
              getValue={this.handleInputChange("pts")}
            />
            <MDBInput
              name="REB"
              label="reb"
              group
              type="number"
              valueDefault={this.state.multiplier.reb}
              getValue={this.handleInputChange("reb")}
            />
            <MDBInput
              name="AST"
              label="ast"
              group
              type="number"
              valueDefault={this.state.multiplier.ast}
              getValue={this.handleInputChange("ast")}
            />
            <MDBInput
              name="STL"
              label="stl"
              group
              type="number"
              valueDefault={this.state.multiplier.stl}
              getValue={this.handleInputChange("stl")}
            />
            <MDBInput
              name="BLK"
              label="blk"
              group
              type="number"
              valueDefault={this.state.multiplier.blk}
              getValue={this.handleInputChange("blk")}
            />
            <MDBInput
              name="TO"
              label="to"
              group
              type="number"
              valueDefault={this.state.multiplier.to}
              getValue={this.handleInputChange("to")}
            />
        </form>
        </MDBCol>

      </MDBRow>
      </MDBContainer>

      <MDBModal isOpen={this.state.modal_team_overview} toggle={this.toggleModal("team_overview")} size="lg">
        <MDBModalHeader toggle={this.toggleModal("team_overview")}>Team Overview</MDBModalHeader>
        <MDBModalBody>
          <MDBDataTable
            autoWidth
            hover
            striped
            bordered
            hover
            small
            paging={false}
            searching={false}
            info={false}
            data={ {columns : modalColumns, rows : this.state.team_totals.map( team => ({
              name : team.name,
              fg : team.totals.fg,
              ft : team.totals.ft,
              three : team.totals.three,
              pts : team.totals.pts,
              reb: team.totals.reb,
              ast : team.totals.ast,
              stl : team.totals.stl,
              blk : team.totals.blk,
              to : team.totals.to
            }) ) } }
            />
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={this.toggleModal("team_overview")}>Close</MDBBtn>
        </MDBModalFooter>
      </MDBModal>

      <MDBModal isOpen={this.state.modal_team_ranks} toggle={this.toggleModal("team_ranks")} size="lg">
        <MDBModalHeader toggle={this.toggleModal("team_ranks")}>Team Overview</MDBModalHeader>
        <MDBModalBody>
          <MDBDataTable
            autoWidth
            hover
            striped
            bordered
            hover
            small
            paging={false}
            searching={false}
            info={false}
            data={ {columns : modalColumns, rows : this.state.team_totals.map( team => ({
              name : team.name,
              fg : team.rank.fg,
              ft : team.rank.ft,
              three : team.rank.three,
              pts : team.rank.pts,
              reb: team.rank.reb,
              ast : team.rank.ast,
              stl : team.rank.stl,
              blk : team.rank.blk,
              to : team.rank.to
            }) ) } }
            />
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={this.toggleModal("team_ranks")}>Close</MDBBtn>
        </MDBModalFooter>
      </MDBModal>

      {positions.map((pos, index) => (
        <MDBModal isOpen={this.state["modal_tiers_" + pos.abbreviation]} toggle={this.toggleModal("tiers_" + pos.abbreviation)} fullHeight position="right">
          <MDBModalHeader toggle={this.toggleModal("tiers_" + pos.abbreviation)}>{pos.name}s Remaining:</MDBModalHeader>
          <MDBModalBody>
              <MDBTable small>
                <MDBTableHead>
                  <tr>
                    <th>Tier</th>
                    <th>Players</th>
                    <th>Remaining</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {this.state.tiers[pos.abbreviation].map((tier, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td><ul>{tier.map((player, index) => (<li>{player}</li>))}</ul></td>
                      <td>{tier.length}</td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.toggleModal("tiers_" + pos.abbreviation)}>Close</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      ))}
      </React.Fragment>
  );
  }
}


ReactDOM.render(<App />, document.getElementById("root"));
