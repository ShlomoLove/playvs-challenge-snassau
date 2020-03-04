import React from 'react';
import styled from 'styled-components';
import MatchPlay from './matchPlay';

const StyledRoundOneContainer = styled.div`
  display: flex;
  flex-direction: column; 
  width: 325px;  
`

const StyledMatchMargin = styled.div`
  margin-top: ${props => props.themeMargin};   
`

const SemiRound = props => {
  const {
    simulateWinner,
    match13Winner,
    match14Winner,
    match15Winner
  } = props;

  return (
    <StyledRoundOneContainer>
      {match13Winner !== undefined && match14Winner !== undefined && (
        <StyledMatchMargin themeMargin={'290px'}>
          <MatchPlay simulateWinner={simulateWinner} teamA={['match13Winner', match13Winner]} teamB={['match14Winner', match14Winner]} match={'match15Winner'} matchWinner={match15Winner}/> 
        </StyledMatchMargin>
      )}
    </StyledRoundOneContainer>
  )
}

export default SemiRound; 