import axios, { type AxiosResponse } from "axios";

// Path: src/utils/protocol.ts

// const backend = '/api/'
const backend = '/api/'
export function generateGet<T = any>(path:string, params?:any): 
Promise<AxiosResponse<T>> {
    return axios.get(backend + path, { params, headers: {'token': localStorage.getItem('token')} })    
}

export function generatePost<T = any>(path:string, data?:any):
Promise<AxiosResponse<T>> {
    return axios.post(backend + path, data, {headers: {'Content-Type': 'application/json', 'token': localStorage.getItem('token')}})
}

export function generatePostAvatar<T = any>(path:string, data?:any):
Promise<AxiosResponse<T>> {
    return axios.post(backend + path, data, {headers: {'Content-Type': 'multipart/form-data', 'token': localStorage.getItem('token')}})
}

export function generateGetFriends<T = any>(path:string, params?:any): 
Promise<AxiosResponse<T>> {
    return axios.get(backend + path, { params, headers: {'token': localStorage.getItem('token')} })    
}


export const protocol = axios.create({
    baseURL: "http://81.70.241.166/submit/api/submission",
    headers: {
        "Content-Type": "application/json",
        "X-Csrftoken":"vLH0iNGPu4ufpc9Lk1ekq5VmshkEM6a2aw6FGvxFZxz29Lqat88S4vfiHjQnNoV2",
        "Access-Control-Allow-Origin":"*"
    },
    withCredentials: true
});


// 导出 Axios 实例
export default protocol;

