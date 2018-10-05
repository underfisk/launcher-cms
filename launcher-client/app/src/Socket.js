import io from 'socket.io-client';

/**
 * Socket.io client with steam modifications
 */
export default class Socket
{
    constructor()
    {
        this.sio = null
        if (this.sio === null)
            this.sio = io("ws://localhost:2002", {
                transports: ['websocket']
        })

        return this.sio
    }

    /**
     * Returns the socket instance which is only 1 by making it a singleton
     * 
     * @return {io}
     */
    static getInstance = () =>{
        if (this.sio === null)
            this.sio = io("ws://localhost:2002", {
                transports: ['websocket']
            })
        else
            return this.sio
    }
    

}