import { createContext, useContext, useState, useReducer } from 'react'
import { useUserList } from './UserListContext';
import _ from 'lodash'

const conversationContext = createContext();

const conversationReducer = (state, data) => {
    console.log(state);
    let newState = new Map(state)
    if(data.action == "add"){
        const conversation = {
            user: data.userToOpen,
            open: true,
            active: true,
            offline: false
        }
        newState.set(data.userToOpen._id, conversation)
    }else if(data.action == "remove"){
        newState.get(data._idToClose).active = false;
    }else if(data.action == "update"){
        newState.get(data._id).messages = data.messages;
    }
    console.log(newState);
    return newState;
}

export function ConversationContext({ children }) {
    const [conversationList, setConversationList] = useState([])
    const [activeConversation, setActiveConversation] = useState();
    const [openConversations, setOpenConversations] = useReducer(conversationReducer, new Map());
    const { connectedUsersList } = useUserList();


    console.log("____ConversationContext render")

    //Open a new conversation with ID's user and set it active
    const checkAndSetActiveConversation = (_idToOpen)=>{        

        //Get the data of the user to open
        //Error if not existant->not connected
        const userToOpen = _.find(connectedUsersList, ["_id",_idToOpen]);
        if(userToOpen == undefined){
            return new Error('Cannot open this conversation - User not connected');
        }

        //If the conversation with this user doesnt exist yet
        let convToOpen = _.find(openConversations, ["user._id",_idToOpen]);
        if(convToOpen == undefined){
            console.log('Opening new conversation with ID: ' + _idToOpen)
            setOpenConversations({ userToOpen, action: 'add' });
        }
        setActiveConversation(_idToOpen);
    }
    
    const closeTab = (e, _idToClose, index)=>{
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        setOpenConversations({_idToClose, action: 'remove'})

        if(_idToClose == activeConversation.socketID){
            let newIndex = (index > 0) ? parseInt(index)-1 : 0
            setActiveConversation(connectedUsersList[newIndex])
        }
    }

    const updateConversationMessages = (_id, messages)=>{
        setOpenConversations({_id, messages, action: 'update'});
    }

    return (
        <conversationContext.Provider value={
            {conversationList,setConversationList,
            activeConversation, setActiveConversation,
            openConversations, setOpenConversations,
            checkAndSetActiveConversation, closeTab,
            updateConversationMessages
            }}>
            {children}
        </conversationContext.Provider>
    )
}


export const useConversationContext = () => {
    return useContext(conversationContext);
}