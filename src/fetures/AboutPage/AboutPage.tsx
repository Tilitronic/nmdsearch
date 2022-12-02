import './AboutPage.scss';
import { pageData } from './aboutContent.js';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/storeTypes';

export function AboutPage(){
  const themeName = useSelector((state: RootState) => state.parameters.ui.themeCC);

  return (
    <div className={'AbPg pageElementsWrapper '+themeName}>
      <div className={'AbPg TOC drawer '+themeName}>
        {
          pageData.map((element, index) => {
            return(
              <a href={'#AbPgContentBlock'+index} className='AbPg navLink' key={'AbPgdrawerTitle'+index}>
                <h2 className='AbPgdrawerTitle'>{element.header}</h2>
              </a>
            );
          })
        }
      </div>
      <div className="AbPg content">
        {
          pageData.map((element, index) => {
            return(
              <div key={'AbPgContentBlock'+index} className={'anchorDaddy'}>
                <h2 id={'AbPgContentBlock'+index} className={'anchorTarget'}>
                  {element.header}
                </h2>
                {element.text &&
                              <p>
                                {parse(element.text)}
                              </p>
                }
                {element.elements &&
                              <div>
                                {element.elements}
                              </div>
                }

              </div>
            );
          })
        }
      </div>
    </div>
  );
}