import { Routes, Route } from 'react-router-dom';
import { useRef } from 'react';
import './index.scss';

//redux store
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

//react components
import { Header } from './components/Header';
import { AboutPage }  from './fetures/AboutPage';
import { SearchPage } from './fetures/SearchPage';

// import { RootState } from './store/storeTypes';

import { toCamelCase } from './utils';



function App() {
  const themeName = useSelector((state) => state.parameters.ui.theme);

  // useEffect(() => {
  //   if (shouldUseEffect.current){
  //     shouldUseEffect.current=false;

  //update user redux state
  //     const loggedUserJSON = window.localStorage.getItem('loggedMDSearchUser');
  //     if (loggedUserJSON) {
  //       const user = JSON.parse(loggedUserJSON);
  //       dispatch((update(user)));
  //     }

  //     //update query redux state
  //     const queryJSON = window.localStorage.getItem('queryMDSearch');
  //     if (queryJSON) {
  //       const query = JSON.parse(queryJSON);
  //       dispatch((updateQuery(query)));
  //     }

  //     //update query history redux state
  //     const queryHistoryJSON = window.localStorage.getItem('queryHistoryMDSearch');
  //     if (queryHistoryJSON) {
  //       const queryHistory = JSON.parse(queryHistoryJSON).reverse();
  //       for (let element of queryHistory){
  //         if(store.getState().user.user){
  //           dispatch(updateHistory(element));
  //         }
  //         else{
  //           // console.log("element", element);
  //           dispatch(updateQueryHistory(element));
  //         }
  //       }
  //     }

  //   }
  // }, []);

  return (
    // <Container
    // // sx={{
    // //   maxWidth: false
    // // }}
    // >
    <div>
      <Header/>
      <main>
        <Routes>
          <Route path='/' element={<SearchPage className={toCamelCase(themeName)}/>}/>
          <Route path='/about' element={<AboutPage className={toCamelCase(themeName)}/>}/>
        </Routes>
      </main>
    </div>
  // </Container>


  );
}

export default App;
