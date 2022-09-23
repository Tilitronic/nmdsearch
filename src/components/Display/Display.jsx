import React from 'react';

import styles from './Display.scss';

//material ui
import { AppBar, Toolbar, Button, IconButton, Checkbox, Typography, Box, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function Display({children, name}) {
  return (
    <Box className='displayWrapper'>
      <Box 
        className='displayBar'
        bgcolor='color1'
      >
        <Typography
          variant='subtitle2'
          align='center'
          className='displayBarTypography'
        >{name}</Typography>
        <div className='displayBarButtons'>
          <Checkbox/>
          <IconButton>
            <CloseIcon/>
          </IconButton>
          <IconButton>
            <ExpandMoreIcon/>
          </IconButton> 
        </div>
        
      </Box>
      <Box className='displayContent'
        sx={{
          border: 'color1',
          borderLeft: '1px'
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
