import { useState, useEffect } from 'react'
import socketIOClient from 'socket.io-client'

import Conversation from '../Conversation/Conversation'

function MessagePanel({conversationList}) {
    const [response, setResponse] = useState();

    useEffect(()=>{
        console.log("conv updated")
        console.log(conversationList)
    })
    
    /*
    useEffect(() => {
        const socket = socketIOClient('http://localhost:3000', {autoConnect: false});
        socket.auth = {
            username: "PAUL"
        }
        socket.connect();
        socket.on("connection_confirmed", message => {
            console.log(message)
            setResponse(message);
        });

        socket.on("connection_error", err=>{
            console.log("connection error")
        })

        return () => {
            socket.off("connect_error");
        }
    }, []);
    */

    return (
        <div>
            <h3>MessagePanel</h3>
            <div>
                {conversationList.map((conversationUser, nb)=>{
                    return <>
                        <Conversation user={conversationUser} key={conversationUser}/>
                    </>
                })}
            </div>
        </div>
    )
}

export default MessagePanel
