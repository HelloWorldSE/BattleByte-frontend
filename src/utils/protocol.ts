import axios, { type AxiosResponse } from "axios";

// Path: src/utils/protocol.ts

const backend = '/api/'

export function generateGet<T = any>(path:string, params?:any): 
Promise<AxiosResponse<T>> {
    return axios.get(backend + path, { params })    
}

export function generatePost<T = any>(path:string, data?:any):
Promise<AxiosResponse<T>> {
    return axios.post(backend + path, data, {headers: {'Content-Type': 'application/json'}})
}