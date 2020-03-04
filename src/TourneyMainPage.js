import React, {Component} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import RoundOne from './rounds/roundOne'
import RoundTwo from './rounds/roundTwo'
import SemiRound from './rounds/semiRound'
import FinalRound from './rounds/finalRound'
import WinnerModal from './rounds/winnerModal'

const StyledMainContainer = styled.div`
  display: flex; 
  flex-direction: column; 
`

const StyledBracketContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const StyledTitle = styled.h1`
  font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
  color: #003366;
  font-size: 36px;
  font-weight: 200; 
  text-align: center; 
  margin: 5px; 
`

const StyledRoundTitle = styled.h3`
  font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
  color: teal;
  font-size: 30px;
  text-align: center; 
  font-weight: 200; 
  margin: 5px;  
`

class TourneyMainPage extends Component {
  constructor () {
    super ()
    this.state = {
      games: 0,
      round: 1, 
      team1: {name: ''},
      team2: {name: ''}, 
      team3: {name: ''}, 
      team4: {name: ''},
      team5: {name: ''}, 
      team6: {name: ''}, 
      team7: {name: ''},
      team8: {name: ''},
      team9: {name: ''},
      team10: {name: ''},
      team11: {name: ''},
      team12: {name: ''},
      team13: {name: ''},
      team14: {name: ''},
      team15: {name: ''},
      team16: {name: ''},
      match1Winner: undefined,
      match2Winner: undefined,
      match3Winner: undefined,
      match4Winner: undefined,
      match5Winner: undefined,
      match6Winner: undefined,
      match7Winner: undefined, 
      match8Winner: undefined,
      match9Winner: undefined,
      match10Winner: undefined,
      match11Winner: undefined,
      match12Winner: undefined,
      match13Winner: undefined,
      match14Winner: undefined,
      match15Winner: undefined
    }
  }

  componentDidMount () {
    this.getTeams();
  }

  getTeams = () => {
    //The OpenDota API returns the teams in an array that is already sorted by ranking. The 0 index has the highest ranked and the subsequent indices have the rankings in decending order. To get the top 16 seeds, only the first 16 entries are required.
    let topSixteen
    axios
    .get(`https://api.opendota.com/api/teams`)
    .then (({data}) => {
      topSixteen = data.slice(0, 16)
      topSixteen.map((team, index) => {
        axios
        .get(`https://api.opendota.com/api/teams/${team.team_id}/players`)
        .then(({data}) => {
          team.players = data
        })
        team.seed = index+1
      })
        this.setState ({
          team1: topSixteen[0],
          team2: topSixteen[1],
          team3: topSixteen[2],
          team4: topSixteen[3],
          team5: topSixteen[4],
          team6: topSixteen[5],
          team7: topSixteen[6],
          team8: topSixteen[7],
          team9: topSixteen[8],
          team10: topSixteen[9],
          team11: topSixteen[10],
          team12: topSixteen[11],
          team13: topSixteen[12],
          team14: topSixteen[13],
          team15: topSixteen[14],
          team16: topSixteen[15],
        })
    })
    .catch (error => console.log('error', error))
  }

  simulateWinner = (teamA, teamB, match) => {
    let winner
    let loser
    let {round, games} = this.state
    let num = Math.abs(Math.round(Math.random() - 0.13))
  
    if (teamA[1].seed < teamB[1].seed) {
      winner = num === 0 ? teamA : teamB
      loser = num === 1 ? teamA : teamB
    } else {
      winner = num === 0 ? teamB : teamA
      loser = num === 1 ? teamB : teamA
    }
    winner[1][match] = 'won'
    loser[1][match] = 'lost'
    games += 1; 
    if(round === 1 && games === 8) round +=1;
    if(round === 2 && games === 12) round +=1;
    if(round === 3 && games === 14) round +=1;
    const updatedState = {
      [match]:winner[1],
      [winner[0]]: winner[1],
      [loser[0]]: loser[1],
      round, games
    }
    this.setState(updatedState)
  }

  render () {
    const { round, 
            team1, 
            team2, 
            team3, 
            team4, 
            team5, 
            team6,
            team7, 
            team8, 
            team9, 
            team10,
            team11,
            team12,
            team13,
            team14,
            team15, 
            team16,
            match1Winner,
            match2Winner,
            match3Winner,
            match4Winner,
            match5Winner,
            match6Winner,
            match7Winner, 
            match8Winner,
            match9Winner,
            match10Winner,
            match11Winner,
            match12Winner,
            match13Winner,
            match14Winner,
            match15Winner
    } = this.state

    const roundTitle = {
      1: 'Sweet Sixteen',
      2: 'Elite Eight',
      3: 'Final Four',
      4: 'Championship Match'
    }

    console.log (this.state)

    return (
      <StyledMainContainer>
        <StyledTitle>The Open Data Tournament Bracket</StyledTitle>
        <StyledRoundTitle>{roundTitle[round]}</StyledRoundTitle>
        <StyledBracketContainer>
          {round >= 1  && (
            <RoundOne
              team1={team1}
              team2={team2}
              team3={team3}
              team4={team4}
              team5={team5}
              team6={team6}
              team7={team7}
              team8={team8}
              team9={team9}
              team10={team10}
              team11={team11}
              team12={team12}
              team13={team13}
              team14={team14}
              team15={team15}
              team16={team16}
              simulateWinner={this.simulateWinner}
              match1Winner={match1Winner}
              match2Winner={match2Winner}
              match3Winner={match3Winner}
              match4Winner={match4Winner}
              match5Winner={match5Winner}
              match6Winner={match6Winner}
              match7Winner={match7Winner}
              match8Winner={match8Winner}
            />
          )}
          {round >= 2 && (
            <RoundTwo
              match1Winner={match1Winner}
              match2Winner={match2Winner}
              match3Winner={match3Winner}
              match4Winner={match4Winner}
              match5Winner={match5Winner}
              match6Winner={match6Winner}
              match7Winner={match7Winner}
              match8Winner={match8Winner}
              match9Winner={match9Winner}
              match10Winner={match10Winner}
              match11Winner={match11Winner}
              match12Winner={match12Winner}
              simulateWinner={this.simulateWinner}
            />
          )}
          {round >= 3  && (
            <SemiRound
              match9Winner={match9Winner}
              match10Winner={match10Winner}
              match11Winner={match11Winner}
              match12Winner={match12Winner}
              match13Winner={match13Winner}
              match14Winner={match14Winner}
              simulateWinner={this.simulateWinner}
            />
          )}
          {round >= 4  && (
            <FinalRound
            match13Winner={match13Winner}
            match14Winner={match14Winner}
            match15Winner={match15Winner}
            simulateWinner={this.simulateWinner}  
            />
          )}
        </StyledBracketContainer>
        {match15Winner ?
          <WinnerModal match15Winner={match15Winner}/> 
          : null}
      </StyledMainContainer>
    );
  }
}

export default TourneyMainPage;
