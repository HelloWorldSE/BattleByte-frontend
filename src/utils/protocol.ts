import axios, { type AxiosResponse } from "axios";

// Path: src/utils/protocol.ts

// const backend = '/api/'
const backend = 'http://81.70.241.166:9090/'
export function generateGet<T = any>(path:string, params?:any): 
Promise<AxiosResponse<T>> {
    return axios.get(backend + path, { params })    
}

export function generatePost<T = any>(path:string, data?:any):
Promise<AxiosResponse<T>> {
    return axios.post(backend + path, data, {headers: {'Content-Type': 'application/json'}})
}

import axios from "axios";

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

