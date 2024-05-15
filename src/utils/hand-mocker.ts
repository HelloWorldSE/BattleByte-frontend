/**
 * Utils for hand-made hard-coded mockers.
 * These functions ensure the data wrapped inside will turn into an invalid value in production envs.
 * 
 * Work with Vite v5.
 */


export function $null<T>(data: T): T | null {
    if (import.meta.env.DEV) {
        return data
    }
    return null
}

export function $undefined<T>(data: T): T | undefined {
    if (import.meta.env.DEV) {
        return data
    }
    return undefined
}