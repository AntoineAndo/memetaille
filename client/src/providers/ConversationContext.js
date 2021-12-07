import { createContext, useContext, useState, useReducer } from 'react'
import { useUserList } from './UserListContext';
import _ from 'lodash'

const conversationContext = createContext();

const conversationReducer = (state, data) => {
    if(data.action == "add"){
        return [...state, data.idToOpen];
    }else if(data.action == "remove"){
        let newValue = [...state];
        _.remove(newValue, function(n) {
            return n == data.convIdToClose;
        });
        return newValue;
    }
}

export function ConversationContext({ children }) {
    const [conversationList, setConversationList] = useState([])
    const [activeConversation, setActiveConversation] = useState();
    const [openConversations, setOpenConversations] = useReducer(conversationReducer, []);
    const { userList, setUserList } = useUserList();

    const checkAndSetActiveConversation = (idToOpen)=>{
        if(openConversations.indexOf(idToOpen)  < 0){
            console.log('Opening new conversation with ID: ' + idToOpen)
            setOpenConversations({ idToOpen, action: 'add' });
        }
        const newUser = _.find(userList, ['socketID', idToOpen]);
        setActiveConversation(newUser)
    }

    return (
        <conversationContext.Provider value={
            {conversationList,setConversationList,
            activeConversation, setActiveConversation,
            openConversations, setOpenConversations,
            checkAndSetActiveConversation
            }}>
            {children}
        </conversationContext.Provider>
    )
}


export const useConversationContext = () => {
    return useContext(conversationContext);
}