import axios from 'axios'

const loginApi = 'api/login'
const registerApi = 'api/users'
const loginUrl= process.env.REACT_APP_LOCALHOST ? process.env.REACT_APP_LOCALHOST+loginApi : 'https://md-search.herokuapp.com/'+loginApi;
const registerUrl= process.env.REACT_APP_LOCALHOST ? process.env.REACT_APP_LOCALHOST+registerApi : 'https://md-search.herokuapp.com/'+registerApi;

export async function login(credentials){
    try{
        const response = await axios({
            method: 'post',
            url: loginUrl,
            params:{
                ...credentials,
            },
        });
        console.log("Login response.data", response.data);
        return response.data
    }
    catch(error){
        console.log("Login failed: ", error)
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
        console.log("Registeration response.data", response.data);
        return response.data
    }
    catch(error){
        console.log("Registration failed: ", error)
    }

}