import { httpClient } from '../axiosconfig.js/httpclient'
const axios = require('axios').default
     const urlPath = "http://localhost:3005/"
     export const UserLogin = async (params) =>{
        const subPath = 'auth/login'
        // const response = await fetch(`${urlPath+subPath}`,{
        //     method: 'POST',
        //     headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'},
        //     body:JSON.stringify(params)
        // })
        // const jsonResponse = await response.json();
        // return jsonResponse;
        const response = await httpClient.post(`${urlPath+subPath}`,
        JSON.stringify(params),
        {headers:{'Content-Type':'application/json'}})
        .then((res) => {
            console.log(res)
            return res;
        })
        .catch((err) => {
            console.log(err)
            return err;
        })
        .finally(() => {
            //always executed
        })
        return response.data;
    }
