import { RefObject, useEffect } from 'react';
type refObj = RefObject<HTMLElement>

export function useOutsideClickDetector(ref1: refObj, isShow=false, handleClick=() => {null;}, ref2: refObj) {
  const handleClickOutside =(event: MouseEvent) => {
    if(!event?.target){return;}
    if (ref1.current && !ref1.current.contains(event.target as Node) && isShow && ref2.current && !ref2.current.contains(event.target  as Node)) {
      handleClick();
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref1, handleClickOutside, ref2]);
}