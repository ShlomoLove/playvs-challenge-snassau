import React from 'react';
import styled from 'styled-components';

const StyledModalContainer = styled.div`
  position: fixed;
  display: block;
  z-index: 10;
  height: 50%;
  width: 50%;
  top: 25%;
  left: 25%;
  background: rgb(80, 80, 80);
  border-radius: 10px;
  border: solid rgb(180, 200, 200);
  color: solid rgb(100, 100, 100);
`

const StyledCategory = styled.h4 `
  font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: rgb(220, 220, 220);
  margin-left: 10px;
  margin-top: 5px; 
`

const StyledContent = styled.span`
  font-weight: 300;
  color: white; 
`

const StyledImage = styled.img`
  width: 50px;
  float: right;
  margin-right: 15px;   
  z-index: 50;  
`


const TeamModal = props => {
  const {name, logo, players, wins, losses, rating} = props

  return (
    <StyledModalContainer>
      <StyledImage src={logo}/>
      <StyledCategory>
        Name: <StyledContent>{name}</StyledContent> 
      </StyledCategory>
      <StyledCategory>
        Rating: <StyledContent>{rating}</StyledContent> 
      </StyledCategory>
      <StyledCategory>
        Wins: <StyledContent>{wins}</StyledContent> 
      </StyledCategory>
      <StyledCategory>
        Losses: <StyledContent>{losses}</StyledContent> 
      </StyledCategory>
      <StyledCategory> Current Players:{players.filter(current => current.is_current_team_member).map(player => (
        <StyledContent key={player.account_id}> '{player.name}' </StyledContent> 
        ))}
      </StyledCategory>
    

    </StyledModalContainer>
  )
}

export default TeamModal;