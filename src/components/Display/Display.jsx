import React from 'react';

import styles from './Display.css';

//material ui
import { AppBar, Toolbar, Button, IconButton, Checkbox, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function Display({children, name}) {
  return (
    <div className='displayWrapper'>
      <div className='displayBar'>
        <Typography>{name}</Typography>
        <Checkbox/>
        <IconButton>
          <CloseIcon/>
        </IconButton>
        <IconButton>
          <ExpandMoreIcon/>
        </IconButton>
      </div>
      <div className='displayContent'>
        {children}
      </div>
    </div>
  )
}
