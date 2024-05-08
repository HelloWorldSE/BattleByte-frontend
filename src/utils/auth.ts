import { Base64 } from "js-base64"

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