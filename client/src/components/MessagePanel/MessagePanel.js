import { main, tabsContent } from './MessagePanel.module.scss'
import Conversation from '../Conversation/Conversation'
import _ from 'lodash'
import TabHeader from '../TabHeader/TabHeader'

import { useConversationContext } from '../../providers/ConversationContext';

function MessagePanel({socket, auth}) {

    console.log("_____MessagePanel render");

    const { openConversations,
            checkAndSetActiveConversation, closeTab,
            updateConversationMessages } = useConversationContext()
    
    console.log(openConversations)
    let activeConversation;
    if(openConversations.size > 0){
        activeConversation = [...openConversations].reduce((mapElement)=>(mapElement[1].active == true))[1];
    }

    const fetchConversation = (conversation)=>{
        socket.emit('fetchConversation', conversation.user._id, (response)=>{
            console.log("Fetch conversation:")
            console.log(response);
            if(response.length > 0){
                if(response.length == conversation.messages.length && 
                    response[response.length-1].message == conversation.messages[conversation.messages.length-1].message){
                        console.log("no new message")
                        return;
                }
                //activeConversation.messages = response;
                updateConversationMessages(activeConversation.user._id, response);
            }
        });
    }

    console.log("Active conversation:")
    console.log(activeConversation)

    return (
        <div className={main}>
            <TabHeader
                openConversations={openConversations}
                openTabAction={checkAndSetActiveConversation}
                closeTabAction={closeTab}/>

            <div className={tabsContent}>
                {activeConversation != undefined && 
                    <Conversation
                        activeConversation={activeConversation}
                        auth={auth}
                        key={activeConversation.user._id}
                        socket={socket}
                        fetchConversation={fetchConversation}/>
                }
            </div>

        </div>
    )
}

export default MessagePanel
