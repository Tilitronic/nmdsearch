import './DisplayElement.scss';
import { toCamelCase } from '../../../utils';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/storeTypes';

export function DisplayElement({ children, name }){
  const themeName = useSelector((state: RootState) => state.parameters.ui.theme);
  const selectedFont=useSelector((state: RootState) => state.parameters.ui.textResultFontFamily);

  return (
    <div className={'DE elementsWrapper '+toCamelCase(themeName)+' '+toCamelCase(selectedFont)}>

      <div className={'DEbar '+toCamelCase(themeName)}>
        <p className='DEtitle'>
          {name}
        </p>
        {/* <div className='displayBarButtons'>
              <Checkbox/>
              <IconButton>
                <CloseIcon/>
              </IconButton>
              <IconButton>
                <ExpandMoreIcon/>
              </IconButton>
            </div> */}

      </div>

      <div className={'DEcontent '}>
        {children}
      </div>

    </div>
  );
}