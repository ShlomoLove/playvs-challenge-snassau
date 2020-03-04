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
    match9Winner,
    match10Winner,
    match11Winner,
    match12Winner,
    match13Winner,
    match14Winner
  } = props;

  return (
    <StyledRoundOneContainer>
      {match9Winner !== undefined && match10Winner !== undefined && (
        <StyledMatchMargin themeMargin={'130px'}>
          <MatchPlay simulateWinner={simulateWinner} teamA={['match9Winner', match9Winner]} teamB={['match10Winner', match10Winner]} match={'match13Winner'} matchWinner={match13Winner}/> 
        </StyledMatchMargin>
      )}
      {match11Winner !== undefined && match12Winner !== undefined && (
        <StyledMatchMargin themeMargin={'235px'}>
          <MatchPlay simulateWinner={simulateWinner} teamA={['match11Winner', match11Winner]} teamB={['match12Winner', match12Winner]} match={'match14Winner'} matchWinner={match14Winner}/> 
        </StyledMatchMargin>
      )}
    </StyledRoundOneContainer>
  )
}

export default SemiRound; 