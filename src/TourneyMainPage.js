import React, {Component} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import WinnerModal from './rounds/winnerModal';
import Round from './rounds/round.js';
import SizeInput from './sizeInput';

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

class TourneyMainPage extends Component {
  constructor () {
    super ()
    this.state = {
      round: 0,
      rounds: []
    }
  }

  setTeamNumber = (size) => {
    let num = parseInt(size, 10)
    if (num >= 2 && num <= 100) {
      this.setState({ totalTeams: size }, () => {
        this.getTeams();
      });
    } else {
      this.setState({numError: true})
    }
  }

  getTeams = () => {
    //The OpenDota API returns the teams in an array that is already sorted by ranking. The 0 index has the highest ranked and the subsequent indices have the rankings in decending order. To get the top 16 seeds, only the first 16 entries are required.
    // console.log (size, typeof size)
    let teamPool
    const {round, rounds, totalTeams } = this.state
    
    axios
    .get(`https://api.opendota.com/api/teams`)
    .then (({data}) => {
      teamPool = data.slice(0, totalTeams)
      teamPool.map((team, index) => {
        axios
        .get(`https://api.opendota.com/api/teams/${team.team_id}/players`)
        .then(({data}) => {
          team.players = data
        })
        team.seed = index+1
      })
      let currentRound = this.sortBracket(teamPool)
      rounds.push(currentRound)
      let newRound = round;
      newRound += 1; 
      this.setState ({ rounds, round: newRound })
    })
    .catch (error => console.log('error', error))
  }

  sortBracket = (teamPool) => {
    const { totalTeams } = this.state
    let teamPoolIndexed = {}
    teamPool.map((team, index) => {
      teamPoolIndexed[index+1] = team;
    })
    const teamNum = this.getBalancedBracket(totalTeams)
    const roundNum = Math.log(teamNum)/Math.log(2)
    let roundArray = new Array(roundNum)
    for (let x =0; x < roundNum; x++) {
      roundArray[x] = [];
    }    
    roundArray[roundNum] = [1,2]
    for (let i = roundNum; i > 0; i--) {
      let round = roundArray[i];
      let previousRound = roundArray[i-1];
      for (let y = 0; y < round.length; y++){
        let teamsRound = round.length*2
        previousRound[y*2] = round[y]
        previousRound[(y*2)+1] = teamsRound + 1 - round[y]
      }
    }
    let firstRound = roundArray[1]
    firstRound.map((team, index) => {
      firstRound[index] = teamPoolIndexed[team] ? teamPoolIndexed[team] : { name: 'BYE' }
    })
    let currentRound = this.distributeMatches(firstRound)
    return currentRound
  }

  getBalancedBracket = (poolNum) => {
    const poolInt = parseInt(poolNum, 10)
    const balancedOptions = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]
    for (let equals of balancedOptions) {
      if (equals === poolInt) {
        return poolInt;
      };
    }
    // if (balancedOptions.includes(poolNum)) return poolNum
    for (let option of balancedOptions) {
      if (option > poolInt) return option
    }
  }

  distributeMatches = (pool) => {
    let initialDistributedPool = []
    for (let i = 0; i < pool.length; i+=2) {
      let match = [pool[i], pool[i+1]]
      initialDistributedPool.push(match)
    }
    const half = initialDistributedPool.length/2;
    let leftHalf = initialDistributedPool.splice(0, half);
    let rightHalf = [];
    while (initialDistributedPool.length > 0) {
      rightHalf.push(initialDistributedPool.pop())
    }
    const finalDistributedPool = [...leftHalf, ...rightHalf]
    return finalDistributedPool;
  }

  simulateWinner = (teamA, teamB, match, count) => {
    let winner
    let loser
    let findWinner
    let {round, rounds} = this.state
    let num = Math.abs(Math.round(Math.random() - 0.15))
    let length = rounds[round-1].length

    if (teamB[1].name === 'BYE') {
      winner = teamA
      loser = teamB 
    } else {
      if (teamA[1].seed < teamB[1].seed) {
        winner = num === 0 ? teamA : teamB
        loser = num === 1 ? teamA : teamB
      } else {
        winner = num === 0 ? teamB : teamA
        loser = num === 1 ? teamB : teamA
      }
    }
  
    winner[1][match] = 'won'
    loser[1][match] = 'lost'
    winner[1][`round${round}`] = 'won'
    loser[1][`round${round}`] = 'lost'

    let currentRound = rounds[round-1];

    if (count === length && length > 1) {
      const nextRound = this.renderNextRound(currentRound, round)
      rounds.push(nextRound)
      round += 1
    }

    if (length === 1) {
      findWinner = this.displayWinner(currentRound[0], round)
    }
    
    const updatedState = {
      [match]: winner[1],
      [winner[0]]: winner[1],
      [loser[0]]: loser[1],
      round, rounds, tourneyWinner: findWinner
    }

    this.setState(updatedState)
  }

  renderNextRound = (currentRound, round) => {
    let nextRound = [];
    for (let i = 0; i < currentRound.length; i+=2) {
      let teamA = currentRound[i][0][`round${round}`] === 'won' ? currentRound[i][0] : currentRound[i][1]
      let teamB = currentRound[i+1][0][`round${round}`] === 'won' ? currentRound[i+1][0] : currentRound[i+1][1]
      let match = [teamA, teamB];
      nextRound.push(match)
    }
    return nextRound
  }

  displayWinner = (currentRound, round) => {
    let winner
    for (let team of currentRound) {
      if (team[`round${round}`] === 'won') winner = team;
    }
    return winner
  }

  render () {
    const {rounds, tourneyWinner, totalTeams, numError
    } = this.state

    console.log (this.state, 'state')

    return (
      <StyledMainContainer>
        <StyledTitle>The Open Data Tournament Bracket</StyledTitle>
        {totalTeams === undefined && (
          <SizeInput numError={numError} setTeamNumber={this.setTeamNumber}/>
        )}
        {totalTeams ? 
        <StyledBracketContainer>
          {rounds && (rounds.map((round, index) => { 
            return (
              <Round simulateWinner={this.simulateWinner} round={round} roundNum={index+1}/>
            )
          }))}
        </StyledBracketContainer> : null
        }
        {tourneyWinner ?
          <WinnerModal tourneyWinner={tourneyWinner}/> 
          : null}
      </StyledMainContainer>
    );
  }
}

export default TourneyMainPage;
