import { Base64 } from "js-base64"
import JSEncrypt from "jsencrypt"
import.meta.env // 这个是一个特殊的变量，可以获取到环境变量

function assert(predict: boolean, message: string) {
    if (! predict)
        throw message
}

export interface JWTContent {
    header: {alg: string, typ: string},
    payload: any,
    verifySignature: string
}

export function extractJWT(JWTText: string): JWTContent { 
    const splittedJWT = JWTText.split('.')
    assert (splittedJWT.length == 3, `splittedJWT: ${splittedJWT}`)

    const [header_text, payload_text, verifySignature] = splittedJWT
    
    return {
        header: JSON.parse(Base64.decode(header_text)),
        payload: JSON.parse(Base64.decode(payload_text)),
        verifySignature
    }
}

export function getUserId(): string {
    const token = localStorage.getItem('token')
    if (! token) {
        return ""
    }
    return extractJWT(token).payload.userId
}

export function isLoggedIn(): boolean {
    return localStorage.getItem('token') != null
}

export function encryptPassword(password: string): string {
    const publicKey = import.meta.env.VITE_PUBLIC_KEY || "";
    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(publicKey); // 设置公钥
    return encryptor.encrypt(password) as string; // 对需要加密的数据进行加密
}