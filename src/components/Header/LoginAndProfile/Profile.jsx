import { useSelector, useDispatch } from 'react-redux';
import { remove, removeHistory } from '../../../store/user/userSlice.js';
import { useState } from 'react';
import { Button, Box, Menu, MenuItem } from '@mui/material';
import './LoginAndProfile.scss';
function Logout (){
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const themeName = useSelector((state) => state.parameters.ui.themeCC);

  const logout = () => {
    dispatch(remove(user));
    dispatch(removeHistory());
    // window.localStorage.removeItem('loggedMDSearchUser');
    // window.localStorage.removeItem('queryHistoryMDSearch');
  };
  return(
    <Button size='small' variant="contained" color="primary" onClick={logout}>Logout</Button>
  );
}

const settings = [<Logout key='st1lap'/>];

export function Profile(){
  const [anchorElUser, setAnchorElUser] = useState(null);
  const user = useSelector((state) => state.user.user);
  const themeName = useSelector((state) => state.parameters.ui.themeCC);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return(
    <div id="profileWrapper">
      <Box>
        <button
          className={'PrFl '+themeName}
          onClick={handleOpenUserMenu}
        >
          {user.username}
        </button>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              {setting}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </div>
  );
}