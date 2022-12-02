import React from 'react';
import './Sources.scss';

//redux state
import { useSelector, useDispatch } from 'react-redux';
import { toggleDictState } from '../../../store/parameters/parametersSlice.js';

export function Sources() {
  const sources = useSelector((state) => state.parameters.sources);
  const dispatch = useDispatch();
  const themeName = useSelector((state) => state.parameters.ui.themeCC);

  // console.log('sources', sources);
  const handleCheckbox = (event) => {
    // console.log('changed');
    dispatch(toggleDictState({ dict: event.target.id }));

    //dispatch
  };

  return(
    <div >
      <div className='prms wrapper'>
        <div className='prms checkboxesWrapper'>
          {Object.values(sources).map((element, index) => {
            // console.log('element', element);
            return(
              <label htmlFor={element.name}  key={'hpCheckbox'+index} className={'container noSelection '+themeName}>
                <input
                  className={'prms checkbox '+themeName}
                  type='checkbox'
                  id={element.name}
                  name={element.name}
                  checked={element.checked}
                  onChange={handleCheckbox}
                />
                <span className='checkmark'></span>
                <p>{element.label}</p>
              </label>
            );}
          )}

        </div>
        <div >
          {/* <Button sx={{height: '25px', width: '25px'}} variant="contained" color='secondary'>a</Button> */}
        </div>
      </div>
    </div>
  );
}
