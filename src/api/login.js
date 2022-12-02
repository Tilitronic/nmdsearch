import axios from 'axios';

const localhost = process.env.REACT_APP_LOCALHOST;
const backend = process.env.REACT_APP_BACKEND;

const loginApi = 'api/login';
const registerApi = 'api/users';


const loginUrl= localhost ? localhost+loginApi : backend+loginApi;
const registerUrl= localhost ? localhost+registerApi : backend+registerApi;

export async function login(credentials){
  try{
    const response = await axios({
      method: 'post',
      url: loginUrl,
      params:{
        ...credentials,
      },
    });
    console.log('Login response.data', response.data);
    return response.data;
  }
  catch(error){
    console.log('Login failed: ', error);
  }

}


export async function register(credentials){
  try{
    const response = await axios({
      method: 'post',
      url: registerUrl,
      params:{
        ...credentials,
      },
    });
    console.log('Registeration response.data', response.data);
    return response.data;
  }
  catch(error){
    console.log('Registration failed: ', error);
  }

}