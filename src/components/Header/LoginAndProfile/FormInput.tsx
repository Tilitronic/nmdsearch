import { useEffect, useState } from 'react';
type ValidationObj = {value: boolean, rule?: string, regex?: RegExp}
type VerificationStatus = {
    spesialChar?: ValidationObj,
    upperLetter?: ValidationObj,
    lowerLetter?: ValidationObj,
    number?: ValidationObj,
    length?: ValidationObj,
    total: ValidationObj
} | null

interface FormInputProps {
    inputData: string,
    dataType: 'password'|'mail',
}

// const passwordValidation = {
//   spesialChar: {
//     validation: true,
//     regex: /[!@#$%^&*]/,
//     rule: 'should be at least one special character from the next list'
//   },
//   upperLetter: boolean,
//   lowerLetter: boolean,
//   number: boolean,
//   length: boolean,
//   total: boolean
// };

export function FormInput ({ inputData, dataType }: FormInputProps){
  const [validation, setValidation] = useState<VerificationStatus>(null);

  useEffect(() => {
    console.log('new input');
    validateInput(inputData, dataType);
  }, [inputData]);

  function validateInput (input: string, type: string){
    const status: VerificationStatus ={
      spesialChar: { value: true, regex: /[!@#$%^&*]/, rule: 'Should be at least one special character from the next list: !@#$%^&*.' },
      upperLetter: { value: true, regex: /[A-Z]/, rule: 'Should be at least one capital letter' },
      lowerLetter: { value: true, regex: /[a-z]/, rule: 'Should be at least one lowercase letter' },
      number: { value: true, regex: /[\d]/, rule: 'Should be at least one digit' },
      length: { value: true, regex: /[*]{8, }/, rule: 'Should minimum 8 caracter' },
      total: { value: true },
    };
    if(type==='password'){
      status.spesialChar.value = Boolean(status.spesialChar.regex);
      status.upperLetter.value = Boolean(input.match(/[A-Z]/));
      status.lowerLetter.value = Boolean(input.match(/[a-z]/));
      status.number.value = Boolean(input.match(/[\d]/));
      status.length.value = input.length>=8;
      status.total.value= Object.values(status).reduce((initialValue: boolean, obj: ValidationObj) => {
        if(obj?.regex){return obj.value && initialValue;}
      }, true);
      setValidation(status);
      console.log('status', status);
    }


  }
  return(
    <div>
      <p>validation: </p>
      {validation && 'validating...'}
    </div>
  );
}