import { useSelector, useDispatch } from 'react-redux';
import { update, remove, removeHistory} from '../features/user/userSlice.js';
import { useState } from 'react';

import { Button, Box, Menu, Typography, MenuItem } from '@mui/material';

function Logout (){
    const user = useSelector((state) => state.user.user)
    const dispatch = useDispatch()

    const logout = ()=>{
        dispatch(remove(user));
        dispatch(removeHistory())
        window.localStorage.removeItem('loggedMDSearchUser');
        window.localStorage.removeItem('queryHistoryMDSearch');
    }
    return(
        <Button size='small' variant="contained" color="primary" onClick={logout}>Logout</Button>
    )
}

const settings = [<Logout/>];

export function Profile(){
    const [anchorElUser, setAnchorElUser] = useState(null);
    const user = useSelector((state) => state.user.user)

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };
    const handleCloseUserMenu = () => {
            setAnchorElUser(null);
        };
    
    return(
        <div id="profileWrapper">
            <Box>
                <Button
                    onClick={handleOpenUserMenu}
                >
                    {user.username}
                </Button>
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
    )
}