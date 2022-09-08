
import {Login} from './Login.js'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { update, remove} from '../features/user/userSlice.js';
import {Profile} from './Profile.js';


function Logout (){
    const user = useSelector((state) => state.user.user)
    const dispatch = useDispatch()

    const logout = ()=>{
        dispatch((remove(user)))
        window.localStorage.removeItem('loggedMDSearchUser')
    }
    return(
        <button onClick={logout}>Logout</button>
    )
}

export function LoginAndProfile () {
    const user = useSelector((state) => state.user.user)

    return(
        <div id='LoginAndProfile'>
            <div id='login-logout'>
                {!user ? <Login/> : <Logout/>}
            </div>
            {user &&
            
                <Profile/>
            }
        </div>
    )
}