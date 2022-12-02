import './Header.scss';

//react elements
import { SearchField } from './SearchField';
import { SearchHistory } from './SearchHistory';
import { Sources } from './Sources';
import { LoginAndProfile } from './LoginAndProfile';
import { Navigation } from './Navigation';
import { Parameters } from './Parameters';
import { useSelector } from 'react-redux';

export function  Header(){
  const themeName = useSelector((state) => state.parameters.ui.themeCC);

  return(
    <div className={'HDheaderWraper '+themeName}>
      <div className={'HDheaderElementsWrapper '+themeName}>

        <div className='search'>
          <SearchField/>
        </div>

        <div className='history'>
          <SearchHistory/>
        </div>

        <div className='params'>
          <Sources/>
        </div>

        <div>
          <Parameters/>
        </div>

        <div className='navigation'>
          <Navigation/>
        </div>

        <div id='loginAndProfileWrapper'>
          <LoginAndProfile/>
        </div>

      </div>
    </div>
  );
}