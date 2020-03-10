import React, { useState } from 'react';
import styled from 'styled-components';
import MatchPlay from './matchPlay';

const StyledRoundContainer = styled.div`
  display: flex;
  flex-direction: column; 
  width: 325px;
  justify-content: space-evenly;   
`

const Round = props => {
  const {
    simulateWinner, round, roundNum
  } = props;
const [gamesCompleted, completeGame] = useState (0)

  return (
    <StyledRoundContainer>
      {round.map((match, index) => {
        return (
          <MatchPlay simulateWinner={simulateWinner} teamA={['teamA', match[0]]} teamB={['teamB', match[1]]} match={`match${roundNum}${index}`} round={round} key={`${roundNum}${index}`} completeGame={completeGame} gamesCompleted={gamesCompleted}/>
        )
      })}
    </StyledRoundContainer>
  )
}

export default Round; 