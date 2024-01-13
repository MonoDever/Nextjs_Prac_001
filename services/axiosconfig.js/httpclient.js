
import axios from "axios";
import join from "url-join";

axios.interceptors.request.use(async (config) => {
    const jwtToken = null;
    if(jwtToken != null){
        config.headers = {'Authorization':`Bearer ${jwtToken}`}
    }
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