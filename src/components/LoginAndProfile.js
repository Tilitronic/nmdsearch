
import {Login} from './Login.js'
import { useSelector } from 'react-redux';
import {Profile} from './Profile.js';

export function LoginAndProfile () {
    const user = useSelector((state) => state.user.user)

    return(
        <div id='LoginAndProfile'>
            {user ? <Profile/> : <Login/>}
        </div>
    )
}