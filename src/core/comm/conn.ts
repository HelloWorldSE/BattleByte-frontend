import type { ErrorData, WSProtocol } from "./interfaces"

class AutoIncrement {
    public num: number = 0
    
    next(): number {
        this.num ++
        return this.num
    }
}

export class ConnectionClient {
    socket!: WebSocket
    auto_id = new AutoIncrement()
    listeners: {[type: string]: (data: any)=>any} = {}
    errListeners: {[req: number]: (data: ErrorData)=>void} = {}

    retryDelay: number = 1  // 重试延迟秒数，max = 160

    constructor(public server_addr: string) {
        this.startNewWebSocketConnection()
    }

    startNewWebSocketConnection() {
        const server_addr = this.server_addr

        this.socket = new WebSocket(server_addr)
        this.socket.onopen = (e: Event) => {
            this.retryDelay = 1

            console.log(`[CC] WebSocket Connected to ${server_addr}`)
        }
        this.socket.onmessage = (e: MessageEvent) => {
            const wrapped_data = this.deconstructWrappedDataJSON(e.data)
            console.log(`[CC] Receive Message <${wrapped_data.type}>: \n--------------\n${e.data}\n--------------`)
            this.distribute(wrapped_data)
        }
        this.socket.onerror = (e: Event) => {
            console.error(`[CC] Error on ${server_addr}. Details:\n`, e)
        }
        this.socket.onclose = (e: Event) => {
            console.error(`[CC] Connection to ${server_addr} has stopped.`)
            this.reconnect()
        }
    }

    private reconnect() {
        this.retryDelay = Math.min(this.retryDelay * 2, 160)
        console.log(`[CC] Retry connecting in ${this.retryDelay} seconds.`)
        setTimeout(() => {
            console.log(`[CC] Retry connecting...`)
            this.startNewWebSocketConnection()
        }, this.retryDelay * 1000)
    }


    sendAfterConstruct(type: string, data: any, errListener?: (data: ErrorData) => void): void {
        const wrapped_data = this.wrapRequestData(type, data)
        if (errListener) {
            this.addErrListener(wrapped_data, errListener)
        }
        this.sendWrappedData(wrapped_data)
    }
    sendWrappedData(wrapped_data: WSProtocol<any>): void {
        const wrapped_data_json = JSON.stringify(wrapped_data)
        console.log(`[CC] Append new client message to sending queue: \n--------------\n${wrapped_data_json}\n--------------`)
        this.socket.send(wrapped_data_json)
    }

    send(type: string, data: any, errListener: (data: ErrorData) => void): void
    send(type: string, data: any): void
    send(wrapped_data: WSProtocol<any>): void

    send(...args: [string, any] | [WSProtocol<any>] | [type: string, data: any, errListener: (data: ErrorData) => void]) {
        if (args.length == 1) {
            this.sendWrappedData.apply (this, args)
        } else {
            this.sendAfterConstruct.apply (this, args)
        }
    }

    wrapRequestData(type: string, data: any): WSProtocol<any> {
        return {
            type,
            data,
            id: this.auto_id.next()
        }
    }

    addListener(title: string, listener: (data: any) => any): void {
        this.listeners[title] = listener
    }

    addErrListener(wrapped_data: WSProtocol<any>, listener: (data: any) => any): void {
        this.errListeners[wrapped_data.id] = listener
    }

    distribute(wrapped_data: WSProtocol<any>) {
        if (wrapped_data.type == 'ERROR') {
            const data = wrapped_data.data as ErrorData
            if (data.ack in this.errListeners) {
                this.errListeners[data.ack] (data)
            } else {
                console.error (`[CC] Server responses error on req #${data.ack}, but no err listener registered. Details: \n`, data)
            }
        } else if (wrapped_data.type in this.listeners) {
            this.listeners[wrapped_data.type] (wrapped_data.data)
        } else {
            console.warn (`[CC] Server sends a message of <${wrapped_data.type}>. Omitting it for no listeners registered.`)
        }
    }

    deconstructWrappedDataJSON(wrapped_data_json: string) {
        const data = JSON.parse(wrapped_data_json)
        return data as WSProtocol<any>
    }
    
}