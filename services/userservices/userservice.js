import { httpClient } from '../axiosconfig.js/httpclient'
const axios = require('axios').default
const urlPath = "http://localhost:3005/"
export const UserLogin = async (params) => {
    const subPath = 'auth/login'
    // const response = await fetch(`${urlPath+subPath}`,{
    //     method: 'POST',
    //     headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'},
    //     body:JSON.stringify(params)
    // })
    // const jsonResponse = await response.json();
    // return jsonResponse;
    const response = await httpClient.post(`${urlPath + subPath}`,
        JSON.stringify(params),
        // { headers: { 'Content-Type': 'application/json' } }
    )
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
export const UserSignup = async (params) => {
    const subPath = 'auth/register'
    const response = await httpClient.post(`${urlPath + subPath}`,
        JSON.stringify(params),
        // { headers: { 'Content-Type': 'application/json' } }
    )
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
export const SendMailForVerifyCode = async (params) => {
    const subPath = 'users/sendEmailForVerifyCode'
    const response = await httpClient.post(`${urlPath + subPath}`,
        JSON.stringify(params),
        // { headers: { 'Content-Type': 'application/json' } }
    );

    return response.data;
}
export const ValidateVerifyCode = async (params) => {
    const subPath = 'users/validateVerifyCode'
    const response = await httpClient.post(`${urlPath + subPath}`,
        JSON.stringify(params),
        // { headers: { 'Content-Type': 'application/json' } }
    );

    return response.data;
}
export const ChangePassword = async (params) => {
    const subPath = 'auth/changePassword'
    const response = await httpClient.post(`${urlPath + subPath}`,
        JSON.stringify(params),
        // { headers: { 'Content-Type': 'application/json' } }
    );

    return response.data;
}

export const GetUserDirectory = async () => {
    const subPath = 'users/getUserDirectory'
    const response = await httpClient.get(`${urlPath + subPath}`)

    return response.data;
}

export const UpdateUserDirectory = async (params) => {
    const subPath = 'users/updateUserDirectory'
    const response = await httpClient.patch(`${urlPath + subPath}`,JSON.stringify(params))

    return response.data;
}