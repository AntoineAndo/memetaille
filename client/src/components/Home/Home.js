import { dashboard } from './Home.module.scss'
import { useEffect, useRef } from 'react' 
import Header from '../Header/Header'
import MessagePanel from '../MessagePanel/MessagePanel'
import socketIOClient from 'socket.io-client'

import { useAuth } from '../../providers/ProvideAuth';
import { useUserList } from '../../providers/UserListContext';
import { ConversationContext } from '../../providers/ConversationContext'

import _ from 'lodash'

import Sidebar from '../Sidebar/Sidebar';

const socket = socketIOClient('http://localhost:3000', {autoConnect: false});


function Home() {
    let auth = useAuth();
    const messageRef = useRef();
    const { userList, setUserList } = useUserList();
    
    console.log("___Home render")

    const handleNewMessage = (data) => {
        //Get the user data associated with the sender's _id
        console.log(userList)
        let _userList = [...userList];
        const sender = _.find(_userList, {_id: data.from});

        if(sender.messages == undefined){
            sender.messages = [];
        }
        sender.messages.push({...data});
        console.log(_userList);
        setUserList(_userList)
    }

    useEffect(() => {
        socket.auth = {
            user: JSON.stringify(auth.loggedUser)
        }
        socket.connect();
        socket.on("connection_confirmed", message => {
            console.log("Connection confirmed");
            auth.setSocketId(message.ownId)
        });

        socket.on("message", (data)=>{
            console.log("new message");
            handleNewMessage(data);
        })

        socket.on("connection_error", err=>{
            console.log("connection error")
        })

        return () => {
            socket.off('connect_error');
            socket.off('message');
            socket.off('connection_confirmed');
        }
    }, []);

    return (
        <section className={ dashboard }>
            <Header/>
            <ConversationContext>
                <Sidebar
                    socket={socket}/>
                <MessagePanel 
                    ref={ messageRef }
                    socket={socket}
                    auth={auth} />
            </ConversationContext>
        </section>
    )
}

export default Home
