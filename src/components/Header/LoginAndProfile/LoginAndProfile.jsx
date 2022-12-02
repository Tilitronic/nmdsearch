import styles from './LoginAndProfile.scss';

import { Login } from './Login.jsx';
import { useSelector } from 'react-redux';
import { Profile } from './Profile.jsx';

export function LoginAndProfile () {
  const user = useSelector((state) => state.user.user);

  return(
    <div id='LoginAndProfile'>
      {user ? <Profile/> : <Login/>}
    </div>
  );
}