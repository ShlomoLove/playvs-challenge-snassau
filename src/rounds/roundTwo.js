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

const RoundTwo = props => {
  const {
    simulateWinner,
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
    match12Winner
  } = props;

  return (
    <StyledRoundOneContainer>
      {match1Winner !== undefined && match2Winner !== undefined && (
        <StyledMatchMargin themeMargin={'44px'}>
          <MatchPlay simulateWinner={simulateWinner} teamA={['match1Winner', match1Winner]} teamB={['match2Winner', match2Winner]} match={'match9Winner'} matchWinner={match9Winner}/> 
        </StyledMatchMargin>
      )}
      {match3Winner !== undefined && match4Winner !== undefined && (
        <StyledMatchMargin themeMargin={'80px'}>
          <MatchPlay simulateWinner={simulateWinner} teamA={['match3Winner', match3Winner]} teamB={['match4Winner', match4Winner]} match={'match10Winner'} matchWinner={match10Winner}/> 
        </StyledMatchMargin>
      )}
      {match5Winner !== undefined && match6Winner !== undefined && (
        <StyledMatchMargin themeMargin={'80px'}>
          <MatchPlay simulateWinner={simulateWinner} teamA={['match5Winner', match5Winner]} teamB={['match6Winner', match6Winner]} match={'match11Winner'} matchWinner={match11Winner}/> 
        </StyledMatchMargin>
      )}
      {match7Winner !== undefined && match8Winner !== undefined && (
        <StyledMatchMargin themeMargin={'80px'}>
          <MatchPlay simulateWinner={simulateWinner} teamA={['match7Winner', match7Winner]} teamB={['match8Winner', match8Winner]} match={'match12Winner'} matchWinner={match12Winner}/> 
        </StyledMatchMargin>
      )}
    </StyledRoundOneContainer>
  )
}

export default RoundTwo; 