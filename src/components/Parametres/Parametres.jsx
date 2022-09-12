import React from 'react';
import { nanoid } from 'nanoid';
import './Parametres.css';

//redux state
import { useSelector, useDispatch } from 'react-redux';
import {toggleDictState} from '../../features/parametres/parametresSlice.js'

import {Checkbox, Box, FormGroup, FormControlLabel} from '@mui/material';

export function Parametres() {
  const parametres = useSelector((state) => state.parametres)
  const dispatch = useDispatch();
  // const sources = [
  //   { 
  //     lable: 'Urban dictionary',
  //     name: 'urban',
  //     key: nanoid(),
  //     default: true
  //   },
  //   { 
  //     lable: 'Wordnet',
  //     name: 'wordnet',
  //     key: nanoid(),
  //     default: false
  //   },
  //   { 
  //     lable: 'Wiktionary',
  //     name: 'wiktionary',
  //     key: nanoid(),
  //     default: false
  //   },
  // ]
  const handleCheckbox = (event) => {
    dispatch(toggleDictState({dict: event.target.id}))
    //dispatch
  };
  
  return(
    <div className='parametres'>
      <Box className='sources'>
        <FormGroup
        className='sourcesFormGroup'
        >
          {Object.values(parametres).map((element)=> 
            <FormControlLabel
              label={element.label}
              className='sourcesFormControlLabel'
              control={
                <Checkbox
                  className='sourcesCheckbox'
                  id={element.name}
                  checked={element.checked}
                  onChange={handleCheckbox}
                  FormControlLabel
                />
              }
            />
          )}
        </FormGroup>
      </Box>
    </div>
  )
}
