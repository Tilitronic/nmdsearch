import { useState, ChangeEvent } from 'react';
export function useField(type: string, label: string, name?: string){
  const [value, setValue] = useState('');

  function processInput(input: string, label: string): string{
    let result = input;
    switch(label){
    case 'username':
      result = input.match(/[a-z\d]*/ig).join('');
      break;
    case 'password':
      break;
    case 'mail':
      result = input.match(/[a-z._\-@\d]*/ig).join('');
      break;
    default:
      break;
    }
    return result;
  }
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input: string = event.target.value;
    // console.log('input', input);
    const processedInput: string = processInput(input, label);
    setValue(processedInput);
  };
  name = name ? name : label;
  return{ field: { type, label, name, value, onChange }, onChange, setValue,  type, label, name, value };
}