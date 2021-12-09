import { main, tabsContent } from './MessagePanel.module.scss'
import Conversation from '../Conversation/Conversation'
import _ from 'lodash'
import TabHeader from '../TabHeader/TabHeader'

import { useConversationContext } from '../../providers/ConversationContext';

function MessagePanel({socket, auth}) {

    const { activeConversation, setActiveConversation,
            openConversations, setOpenConversations } = useConversationContext()

    const openTab = (socketID)=>{
        if(openConversations.indexOf(socketID)  < 0){
            console.log('Opening new conversation with ID: ' + socketID)
            setOpenConversations({socketID, action: 'add'});
        }
        //setActiveTab(socketID);
    }

    const closeTab = (e, convIdToClose, index)=>{
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        setOpenConversations({convIdToClose, action: 'remove'})

        if(convIdToClose == activeConversation.socketID){
            let newIndex = (index > 0) ? parseInt(index)-1 : 0
            //setActiveTab(openConversations[newIndex])
        }
    }
    
    const fetchConversation = (user)=>{
        socket.emit('fetchConversation', user._id, (response)=>{
            if(response.length > 0){
                if(response.length == user.messages.length && 
                    response[response.length-1].message == user.messages[user.messages.length-1].message){
                        console.log("no new message")
                        return;
                }
                const userWithNewMessage = {...user}
                console.log(response)
                userWithNewMessage.messages = response;
                setActiveConversation(userWithNewMessage);
            }
        });
    }

    return (
        <div className={main}>
            <TabHeader
                openConversations={openConversations}
                activeTab={activeConversation?.socketID}
                openTab={openTab}
                closeTab={closeTab}/>

            <div className={tabsContent}>
                {activeConversation != undefined && 
                    <Conversation
                        user={activeConversation}
                        auth={auth}
                        key={activeConversation.socketID}
                        socket={socket}
                        fetchConversation={fetchConversation}/>
                }
            </div>
        </div>
    )
}

export default MessagePanel
