import SettingsIcon from '@mui/icons-material/Settings';
import { setTextResultFontFamily, setTheme,
  setTextResultFontSize,
  setDefoultUiParametres } from '../../../store/parameters/parametersSlice';
import { useSelector, useDispatch } from 'react-redux';
import './Parametres.scss';
import { useRef, useState } from 'react';
import { useOutsideClickDetector } from '../../../hooks/useOutsideClickDetector';
import { RootState } from '../../../store/storeTypes';
import { toCamelCase } from '../../../utils';

const themes = ['Acid Dark', 'Colorless Light'];
const fonts = ['Sans', 'Serif'];
const fontSizes = [5, 50];

export function Parameters (){
  const [isShow, setIsShow] = useState(false);
  const paramsButton = useRef<HTMLButtonElement>(null);
  const paramsDropdown = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  // const [selectedTheme, setSelectedTheme] = useState(0);
  // const [selectedFont, setSelectedFont] = useState(0);
  const [selectedFontSize, setSelectedFontSize] = useState(20);
  const selectedFont=useSelector((state: RootState) => state.parameters.ui.textResultFontFamily);

  const selectedTheme = useSelector((state: RootState) => state.parameters.ui.theme);
  const themeName = useSelector((state: RootState) => state.parameters.ui.themeCC);

  const handleButtonPress = () => {
    setIsShow(!isShow);
  };
  useOutsideClickDetector(paramsButton, isShow, () => {setIsShow(false);},paramsDropdown);
  const handleThemeSelection = (index: number, themeName: string) => {
    dispatch(setTheme(themeName));
  };
  const handleFontSelection = (index: number, fontName: string) => {
    dispatch(setTextResultFontFamily(fontName));
  };

  return (
    <div className='UIparamsWrapper'>
      <button className={'UIparams transparent '+themeName} ref={paramsButton} onClick={() => handleButtonPress()}>
        <SettingsIcon/>
      </button>
      <div className={'parametersDropdownMenu noSelection '+themeName} style={{ display: isShow ? 'flex' : 'none' }} ref={paramsDropdown}>
        <div className={'PrDMthemes PrSubMenu '+themeName}>
          <p>Themes</p>
          <div className='PrsubMenuItems'>
            {
              themes.map((element, index) => {
                const checked = index===themes.indexOf(selectedTheme) ? true : false;
                const camelCaseName = toCamelCase(element);
                return (
                  <label htmlFor="contactChoice2" key={'PrDMtheme'+index} onClick={() => handleThemeSelection(index, element)}>
                    <input type="radio" id={''} name='theme' value={camelCaseName} checked={checked} onChange={() => handleThemeSelection(index, element)}/>
                    <p>{element}</p>
                  </label>
                );
              })
            }
          </div>
        </div>

        <div className={'PrDMfonts PrSubMenu '+themeName}>
          <p>Fonts</p>
          <div className='PrsubMenuItems'>
            {
              fonts.map((element, index) => {
                const checked = index===fonts.indexOf(selectedFont) ? true : false;
                const camelCaseName = toCamelCase(element);
                return (
                  <label htmlFor="contactChoice2" key={'PrDMtheme'+index} onClick={() => handleFontSelection(index, element)}>
                    <input type="radio" id={''} name='font' value={camelCaseName} checked={checked} onChange={() => handleFontSelection(index, element)}/>
                    <p>{element}</p>
                  </label>
                );
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}