import React, {useState } from 'react';
import styled from 'styled-components';
import { Select, MenuItem, InputLabel, makeStyles, FormControl } from '@material-ui/core';

const StyledSizeSelectContainer = styled.div`
  width: 50%;  
  margin: auto; 
  margin-top: 25px; 
`
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 350,
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));


const SizeSelect = props => {
  
  const classes = useStyles();
  const {chooseTeams, chooseSize
  } = props
  
  return (
    <StyledSizeSelectContainer>
      <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id='helperLabel'>Choose Tournament Size</InputLabel>
      <Select labelId='helperLabel' className={classes.formControl} onChange={(e)=>chooseSize(e.target.value)}>
          {chooseTeams.map((num, i)=> (
            <MenuItem value={num} key={i}>{num}</MenuItem>
          ))}
      </Select>
      </FormControl>
    </StyledSizeSelectContainer>
  ) 
}


export default SizeSelect;
