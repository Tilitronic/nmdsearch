import React from 'react';

import styles from './TextResultUnit.css';

import useCollapse from 'react-collapsed';

//material ui
import { Box, Button, Typography, FormControlLabel, FormGroup, Checkbox, IconButton} from '@mui/material';
import { styled } from "@mui/system";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';


function Type2Head({head, color}) {
  return (
    <Typography
      sx={{
        fontSize: '10px',
        color: color
      }}
    >
      {head}
    </Typography>
  )
}

export function TextResultUnit({children, head='Head nor provided', type='1', expanded=true, color='color2', className='expandableElement'}) {
  const StyledExpandMoreIcon = styled(ExpandMoreIcon, {
    name: "StyledExpandMoreIcon",
    slot: "Wrapper"
  })({
    color: color,
    "&:hover": { color: "blue" }
  });

  let borderLeft, height, paddingLeft
  switch (type) {
    case '1':
      borderLeft=0
      height='30px'
      paddingLeft=0
      break;
    case '2':
      borderLeft=2
      height='20px'
      paddingLeft='5px'
      break;
    case '3':
      borderLeft=2
      height='20px'
      break;
    default:
      
  }

  const config = {
    defaultExpanded: expanded
  };
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);
  return (
    <div className={className}>

        <Box 
          className="header" 
          
          sx={{
            borderLeft: borderLeft,
            borderColor: color, //should depend on content
            minHeight: height,
            maxHeight: `calc(${height}+1px)`,
            padding: 0,
            paddingLeft: '7px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'start',
          }}
        >
            <IconButton
              {...getToggleProps()}
              sx={{
                padding: 0,
                marginLeft: -1
              }}
            >
              
              {isExpanded ? 
              <ExpandLessIcon sx={{color: (theme) => theme.palette[color]}} /> : 
              <ExpandMoreIcon sx={{color: (theme) => theme.palette[color]}} />}
            </IconButton>

            <div>
             {type==='1' && head}
             {type==='2' && <Type2Head head={head} color={color}/>}
            </div>
            
        </Box>

        <div {...getCollapseProps()}>
            <Box 
              className="content"
              sx={{
                borderLeft: borderLeft,
                borderColor: color, //should depend on content
                paddingLeft: paddingLeft,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
                {children}
            </Box>
        </div>
    </div>
  )
}
