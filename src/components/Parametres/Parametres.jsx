import React from 'react';
import { nanoid } from 'nanoid';
import './Parametres.css';

//redux state
import { useSelector, useDispatch } from 'react-redux';
import {toggleDictState} from '../../features/parametres/parametresSlice.js'
import {Checkbox, Box, FormGroup, FormControlLabel, Paper, Button, Typography} from '@mui/material';

export function Parametres() {
  const parametres = useSelector((state) => state.parametres)
  const dispatch = useDispatch();

  const handleCheckbox = (event) => {
    dispatch(toggleDictState({dict: event.target.id}))
    //dispatch
  };
  
  return(
    <div >
      <Box
        className='parametres'
        sx={{ 
          // border: 1,
          display: 'flex',
          flexDirection: 'row',
          height: '50px',
          minWidth: '470px',
          maxWidth: '710px'
        }}
      >
        <Paper className='sourcesParam'
          sx={{
            backgroundColor: "color1",
            
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
                label={<Box ><Typography variant="parametres">{element.label}</Typography></Box>}
                
                className='sourcesFormControlLabel'
                control={
                  <Checkbox
                    defaultChecked color="secondary"
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
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* <Button sx={{height: '25px', width: '25px'}} variant="contained" color='secondary'>a</Button> */}
        </Box>
      </Box>
    </div>
  )
}
