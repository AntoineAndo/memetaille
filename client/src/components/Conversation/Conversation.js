import { useState, useEffect, useRef } from 'react'
import { conversation, messagesContainer, inputContainer, sentByMe } from './Conversation.module.scss'

function Conversation({activeConversation, auth, socket, className, fetchConversation}) {
    const [input, setInput] = useState("")
    const endMessage = useRef(null);

    console.log(activeConversation);
    if(activeConversation.offline == true){
        console.log("This user is offline")
    }else{
        console.log("this user is online")
    }

    if(activeConversation.messages == undefined)
        activeConversation.messages = []

    useEffect(()=>{
        fetchConversation(activeConversation);
    }, [activeConversation])

    const onChangeInput = (e)=>{
        setInput(e.target.value)
    }

    const sendMessage = (e)=>{
        e.preventDefault();
        const message = {
            to: activeConversation.user._id,
            from: auth.loggedUser._id,
            message: input
        }

        activeConversation.messages = [...activeConversation.messages, {...message}]
        socket.emit('message', message)

        setInput("");
    }

    useEffect(()=>{
        endMessage.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "end"});
    })

    return (
        <div className={`${conversation} ${className}`}>
            <div className={ messagesContainer }>
                <ul>
                    {activeConversation.messages.map((message, index)=>{
                        return <>
                            <li className={(message.from == auth.loggedUser._id) ? sentByMe : null}>
                                <p>
                                    {message.message}
                                </p>
                            </li>
                        </>
                    })}
                    <div style={{ float:"left", clear: "both" }}
                        ref={endMessage}>
                    </div>
                </ul>
            </div>
            <div className={ inputContainer }>
                <form onSubmit={(e)=>sendMessage(e)}>
                    <input type="text" value={input} onChange={(e)=>onChangeInput(e)} disabled={(activeConversation.offline == true)?true:false}/>
                    <button type="submit" disabled={(activeConversation.offline == true)?true:false} >Send</button>
                </form>
            </div>
        </div>
    )
}

export default Conversation
