import React from 'react';
import styled from 'styled-components';

const StyledModalContainer = styled.div`
  position: fixed;
  display: block;
  z-index: 10;
  height: 70%;
  width: 70%;
  top: 15%;
  left: 15%;
  background: #003366;
  border-radius: 10px;
  border: solid teal;
`

const StyledName= styled.h4 `
  font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
  font-weight: 100;
  font-size: 40px;
  color: white; 
  text-align: center; 
`

const StyledTitle = styled.h1`
  font-weight: 600;
  color: teal;
  font-size: 36px;
  text-align: center;
`

const StyledImage = styled.img`
  width: 20%;
  display: block;   
  float: center;
  margin-left: auto;
  margin-right: auto;  
  z-index: 50;  
`


const WinnerModal = props => {
  const {tourneyWinner} = props

  return (
    <StyledModalContainer>
      <StyledTitle>WINNER</StyledTitle>
      <StyledImage src={tourneyWinner.logo_url}/>
      <StyledName> {tourneyWinner.name}</StyledName>
    </StyledModalContainer>
  )
}

export default WinnerModal;