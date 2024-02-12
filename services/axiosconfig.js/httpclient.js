
import axios from "axios";
import join from "url-join";

axios.interceptors.request.use(async (config) => {
    // const jwtToken = null;
    const jwtToken = JSON.parse(localStorage.getItem('token'));
    if(jwtToken != null){
        config.headers['Authorization'] = `Bearer ${jwtToken.token}`
    }
    config.headers['Content-Type'] = `application/json`
    
    // config.url = join(`http://localhost:3005/`,config.url);
    return config
});

axios.interceptors.response.use(async (response) =>{
    if(response?.data == undefined){
        response.date = {test:'test'}
    }
    return response
})

export const httpClient = axios