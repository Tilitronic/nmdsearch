import { SearchHistory } from "./SearchHistory.js";
import { useSelector, useDispatch } from 'react-redux';
import {Togglable} from './Togglable.js';
import {getUserSearchHistory} from '../services/dbServices.js';
import { getUserQueryHistory } from '../features/user/userThunks.js';

export function Profile(){
    const user = useSelector((state) => state.user.user)

    return(
        <div id="profileWrapper">
            <div>{user.username}</div>
            <Togglable turnOn='show history!' turnOff1='hide history' onTurnOnFunction={getUserSearchHistory}>
                <SearchHistory/>
            </Togglable>
        </div>
    )
}