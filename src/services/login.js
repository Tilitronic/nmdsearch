import axios from 'axios'

const baseUrl = 'api/login'
const url= process.env.REACT_APP_LOCALHOST ? process.env.REACT_APP_LOCALHOST+baseUrl : 'https://md-search.herokuapp.com/'+baseUrl;

async function login(credentials){
    try{
        const response = await axios({
            method: 'post',
            url: url,
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


export default login