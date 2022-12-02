export const toCamelCase = (string: string):string  => {
  return string[0].toLocaleLowerCase()+string.replaceAll(' ', '').slice(1);
};