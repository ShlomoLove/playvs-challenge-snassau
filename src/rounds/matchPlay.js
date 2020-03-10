import React, { useState } from 'react';
import styled from 'styled-components';
import TeamModal from '../teamModal'

const StyledMatchContainer = styled.div `
  display: flex;
  flex-direction: row; 
`

const StyledMatch = styled.div`
  display: flex; 
  flex-direction: column;
  border: solid rgb(192,192,192);
  background: rgb(200, 200, 200);
  margin: 10px;
  font-size: 14px;
  color: rgb(80, 80, 80); 
  font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
  width: 1000px;
`

const StyledTeam = styled.div`
  display: flex; 
  flex-direction: row; 
  border: rgb(180, 180, 180);
  background: ${props => props.themeColor === 'won' ? '#008080' : 'rgb(125, 125, 125)'};
  color: white;
  &:hover{
    cursor: pointer;
    background: ${props => props.themeColor === 'won' ? 'rgb(0, 160, 160)' : 'rgb(80, 80, 80)'};  
  }
`

const StyledTeamImage = styled.img`
  height: 20px;
  width: 20px; 
  margin-left: .5rem;
`

const StyledSeeding = styled.span`
  color: white;
  font-size: 10px;
  width: 10px; 
`

const StyledTeamName = styled.span`
  color: ${props => props.themeColor === 'lost' ? 'rgb(200, 200, 200)' : 'white'}; 
  margin-left: 8px;
  font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
  font-size: 15px; 
  font-weight: 300; 
`

const StyledButton = styled.button`
  background-color: white;
  color: #003366;
  border: 2px solid #003366;
  border-radius: 6px;
  height: 50px;
  margin-top: 17px;
  &:hover {
    background-color: #003366;
    color: white;
    cursor: pointer; 
  }   
`

const MatchPlay = props => {
  const {
    teamA,
    teamB,
    simulateWinner,
    match,
    completeGame,
    gamesCompleted
  } = props;

  const [seeModalA, setModalA] = useState(false)
  const [seeModalB, setModalB] = useState(false)
  const [seeButton, setButton] = useState(true)
  
  return (
    <StyledMatchContainer>
      <StyledMatch>
        <StyledTeam themeColor={teamA[1][match]} onClick={()=> setModalA(true)} onMouseLeave={()=> setModalA(false)}>
          <StyledSeeding>{teamA[1].seed}</StyledSeeding> 
          <StyledTeamImage src={teamA[1].logo_url}/>
          <StyledTeamName themeColor={teamA[1][match]}>{teamA[1].name}</StyledTeamName>
          {seeModalA ? (<TeamModal name={teamA[1].name} logo={teamA[1].logo_url} rating={teamA[1].rating} wins={teamA[1].wins} losses={teamA[1].losses} players={teamA[1].players}/>) : null}
        </StyledTeam>
        vs
        <StyledTeam themeColor={teamB[1][match]} onClick={()=> setModalB(true)} onMouseLeave={()=> setModalB(false)}>
          <StyledSeeding>{teamB[1].seed}</StyledSeeding> 
          <StyledTeamImage src={teamB[1].logo_url}/>
          <StyledTeamName themeColor={teamB[1][match]}>{teamB[1].name}</StyledTeamName>
          {(seeModalB && teamB[1].name !== 'BYE') ? (<TeamModal name={teamB[1].name} logo={teamB[1].logo_url} rating={teamB[1].rating} wins={teamB[1].wins} losses={teamB[1].losses} players={teamB[1].players}/>) : null}
        </StyledTeam>
      </StyledMatch>
      {seeButton ?
          <StyledButton onClick={()=> {simulateWinner(teamA, teamB, match, gamesCompleted+1);setButton(false); completeGame(gamesCompleted+1)}}> PLAY MATCH </StyledButton> 
          : null}
    </StyledMatchContainer>
  )
}

export default MatchPlay; 