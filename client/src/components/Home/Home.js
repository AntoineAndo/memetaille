import { dashboard, messages } from './Home.module.scss'
import { useState, useReducer } from 'react' 
import Header from '../Header/Header'
import MessagePanel from '../MessagePanel/MessagePanel'


import Sidebar from '../Sidebar/Sidebar';


const conversationReducer = (state, data) => {
    let newValue;
    if(data.action == "add"){
        newValue = [...state, data.user];
    }
    return newValue;
}

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

function Home() {
    let [ conversationList, setConversationList ] = useReducer(conversationReducer, []);
    let [ update, setUpdate ] = useState(false);

    const openConversation = (user, edit)=>{
        setConversationList({user, action:'add'});
    }

    return (
        <section className={ dashboard }>
            <Header/>
            <Sidebar openConversation={openConversation}/>
            <MessagePanel conversationList={ conversationList }/>
        </section>
    )
}

export default Home
