import React, {useState} from 'react';
import styled from 'styled-components';
import { TextField, makeStyles } from '@material-ui/core';

const StyledSizeSelectContainer = styled.div`
  display: flex; 
  flex-direction: column;   
  margin: auto; 
  width: 30%;
  align-items: center;
  text-align: center; 
`

const StyledButton = styled.button`
  background-color: white;
  color: #003366;
  border: 2px solid #003366;
  border-radius: 6px;
  height: 50px;
  margin: auto; 
  align-items: center; 
  margin-top: 17px;
  &:hover {
    background-color: #003366;
    color: white;
    cursor: pointer; 
  }   
`

const StyledButtonContainer = styled.div`
  margin: auto;
  display: flex; 
  align-items: center; 
  justify-content: center;
  left: 50%; 
`

const StyledWarning = styled.h1`
font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
font-weight: 500; 
color: crimson; 
text-align: center;
font-size: 28px; 
`

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      width: 300,
    },
  },
}));


const SizeInput = props => {
  const [size, getSize] = useState(0)
  const classes = useStyles();
  const {
    setTeamNumber, numError
  } = props

  return (
    <StyledSizeSelectContainer>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField onChange={event => getSize(event.target.value)} variant="outlined" label="Select Tournament Size" />
      </form> 
      <StyledButtonContainer>
        <StyledButton value={size} onClick={(e) => setTeamNumber(e.target.value)}>
          SUBMIT TOURNAMENT SIZE
        </StyledButton>
      </StyledButtonContainer>
      {numError ? 
      <StyledWarning>PLEASE ENTER A NUMBER BETWEEN 2 AND 1000</StyledWarning>
      : null
      }
    </StyledSizeSelectContainer>
  ) 
} 


export default SizeInput;
