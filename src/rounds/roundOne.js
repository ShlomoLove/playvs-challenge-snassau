import React from 'react';
import styled from 'styled-components';
import MatchPlay from './matchPlay';

const StyledRoundOneContainer = styled.div`
  display: flex;
  flex-direction: column; 
  width: 325px;  
`

const RoundOne = props => {
  const {
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
    simulateWinner,
    match1Winner,
    match2Winner, 
    match3Winner,
    match4Winner,
    match5Winner,
    match6Winner,
    match7Winner,
    match8Winner
  } = props;

  return (
    <StyledRoundOneContainer>
      <MatchPlay simulateWinner={simulateWinner} teamA={['team1', team1]} teamB={['team16', team16]} match={'match1Winner'} matchWinner={match1Winner}/> 
      <MatchPlay simulateWinner={simulateWinner} teamA={['team8', team8]} teamB={['team9', team9]} match={'match2Winner'} matchWinner={match2Winner}/>
      <MatchPlay simulateWinner={simulateWinner} teamA={['team6', team6]} teamB={['team11', team11]} match={'match3Winner'} matchWinner={match3Winner}/>
      <MatchPlay simulateWinner={simulateWinner} teamA={['team4', team4]} teamB={['team13', team13]} match={'match4Winner'} matchWinner={match4Winner}/>
      <MatchPlay simulateWinner={simulateWinner} teamA={['team3', team3]} teamB={['team14', team14]} match={'match5Winner'} matchWinner={match5Winner}/>
      <MatchPlay simulateWinner={simulateWinner} teamA={['team5', team5]} teamB={['team12', team12]} match={'match6Winner'} matchWinner={match6Winner}/>
      <MatchPlay simulateWinner={simulateWinner} teamA={['team7', team7]} teamB={['team10', team10]} match={'match7Winner'} matchWinner={match7Winner}/>
      <MatchPlay simulateWinner={simulateWinner} teamA={['team2', team2]} teamB={['team15', team15]} match={'match8Winner'} matchWinner={match8Winner}/>
    </StyledRoundOneContainer>
  )
}

export default RoundOne; 