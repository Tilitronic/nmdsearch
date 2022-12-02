import './TextResultUnit.scss';

import useCollapse from 'react-collapsed';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useSelector } from 'react-redux';

function Type2Head({ head, contentType }) {
  return (
    <div className={'headType2 '+contentType}>
      {head}
    </div>
  );
}

export function TextResultUnit({ children, head='Head not provided', type='1', expanded=true, contentType='defoult', className='expandableElement' }) {
  const themeName = useSelector((state) => state.parameters.ui.themeCC);

  let borderLeft, height, marginLeft, paddingLeft;
  switch (type) {
  case '1':
    borderLeft='0';
    height='30px';
    marginLeft=0;
    paddingLeft=0;
    break;
  case '2':
    borderLeft='2px';
    height='20px';
    marginLeft='10px';
    paddingLeft='5px';
    break;
  case '3':
    borderLeft=2;
    height='20px';
    break;
  default:

  }

  const style1 = {
    border: '0 solid',
    borderLeft: borderLeft+' solid' ,
    marginLeft: marginLeft,
    minHeight: height,
    maxHeight: `calc(${height}+1px)`,
  };
  const style2={
    paddingLeft: paddingLeft
  };

  const config = {
    defaultExpanded: expanded
  };
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);
  return (
    <div className={className+' expandableElement TRU '+'type'+type} >

      <div
        className={'TRU header '+className}
        style={style1}
      >
        <div {...getToggleProps()} className={'TRU expandButton '+className}>
          {isExpanded ?
            <ExpandLessIcon/>
            :
            <ExpandMoreIcon/>}
        </div>

        <div>
          {type==='1' && head}
          {type==='2' && <Type2Head head={head} contentType={contentType}/>}
        </div>

      </div>

      <div {...getCollapseProps()} >
        <div className={'content '+className} style={{ ...style1, ...style2 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
