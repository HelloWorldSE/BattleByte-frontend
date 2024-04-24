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