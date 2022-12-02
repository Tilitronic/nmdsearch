import { useState } from 'react';

export const Togglable = ({ turnOn, turnOff1=null, turnOff2=null, children, onTurnOnFunction=() => {console.log();} }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const onTurnOn = () => {
    toggleVisibility();
    onTurnOnFunction();

  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={onTurnOn}>{turnOn}</button>
      </div>
      <div style={showWhenVisible}>
        {turnOff1 && <button onClick={toggleVisibility}>{turnOff1}</button>}
        {children}
        {turnOff2 && <button onClick={toggleVisibility}>{turnOff2}</button>}
      </div>
    </div>
  );
};
