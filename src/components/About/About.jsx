import React from 'react';
import {Sources} from '../../components/Sources.js';

import styles from './About.css';

//material ui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { pageData } from '../../data/about.js';
import { Link } from '@mui/material';

import parse from 'html-react-parser';

const drawerWidth = 250;

const navigationTitles = pageData.map((element, index)=>{
  return(
    <a href={"#element"+index} className='navLink' key={"element"+index}>
    <ListItem disablePadding>
      
      <ListItemButton>
        <ListItemText primary={element.header} />
      </ListItemButton>
      
    </ListItem>
    </a>
  )
})

const textContent=pageData.map((element, index)=>{
  // let contBodyData 
  // if(element.text){
  //   contBodyData=element.text
  // }
  // else if(element.elements){
  //   contBodyData=element.elements
  // }  
  return(
    <div key={'element'+index}>
      <Typography variant='h4' id={'element'+index}>
        {element.header}
      </Typography>
      {element.text && 
        <Typography paragraph>
          {parse(element.text)}
        </Typography>
      }
      {element.elements &&
        <div>
            {element.elements}
        </div>
      }

    </div>
  )
})

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      {/* <Toolbar /> */}
      {/* <Divider /> */}
      <List>
        {navigationTitles}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ 
      display: 'flex',
      height: '100vh'
    }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }}}
        aria-label="mailbox folders"
        
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        {/* <Drawer
          container={container}
          className='Drawer'
          variant="temporary"
          
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            width: drawerWidth,
            // marginTop: '70px',
            flexShrink: 0,
            height: 'calc(100% - 70px)',
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          {drawer}
        </Drawer> */}
        <Drawer
          container={container}
          className='Drawer'
          variant="permanent"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          PaperProps={{
            sx: {
              border: '0',
              height: 'calc(100% - 70px)',
              marginTop: '70px',
              backgroundColor: 'color1'
            }
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          width: { sm: `calc(100% - ${drawerWidth}px)`},

        }}
        className='boxAbout'
      >
        {/* <Toolbar /> */}
        {textContent}
      </Box>
    </Box>
  );
}

export function About() {
  return (

    <div className='aboutWrapper'>
      <ResponsiveDrawer/>
    </div>
  )
}
