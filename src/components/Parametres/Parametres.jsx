import React from 'react';
import { nanoid } from 'nanoid';
import './Parametres.css';

//redux state
import { useSelector, useDispatch } from 'react-redux';
import {toggleDictState} from '../../features/parametres/parametresSlice.js'

import {Checkbox, Box, FormGroup, FormControlLabel, Paper} from '@mui/material';

export function Parametres() {
  const parametres = useSelector((state) => state.parametres)
  const dispatch = useDispatch();

  const handleCheckbox = (event) => {
    dispatch(toggleDictState({dict: event.target.id}))
    //dispatch
  };
  
  return(
    <div className='parametres'>
      <Paper className='sourcesParam'
        sx={{
          backgroundColor: "secondary"
        }}
      >
        <FormGroup
        className='sourcesFormGroup'
        sx={{
          flexDirection: 'row'
        }}
        >
          {Object.values(parametres).map((element)=> 
            <FormControlLabel
            key={element.name+'ParametresFormcontrol'}
              label={element.label}
              className='sourcesFormControlLabel'
              control={
                <Checkbox
                  className='sourcesCheckbox'
                  id={element.name}
                  checked={element.checked}
                  onChange={handleCheckbox}
                />
              }
            />
          )}
        </FormGroup>
      </Paper>
    </div>
  )
}
