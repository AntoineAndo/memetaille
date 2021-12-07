import React from 'react'

import { sidebar, fixedUser } from './Sidebar.module.scss';
import UserListEntry from '../UserListEntry/UserListEntry';
import { useAuth } from '../../providers/ProvideAuth';

import { useUserList } from '../../providers/UserListContext';

import { useConversationContext } from '../../providers/ConversationContext';
import _ from 'lodash'

function Sidebar({socket}) {
    const auth = useAuth();
    const { userList, setUserList } = useUserList();
    const { checkAndSetActiveConversation } = useConversationContext();

    let users = userList;
    
    socket.on('user_list', users=>{

        //Exclude self
        _.remove(users, function(n) {
            return n._id == auth.loggedUser._id;
        });

        //setUsers(users)
        setUserList(users);
    })

    return (
        <div className={ sidebar }>
            <div className={ fixedUser }>
                <UserListEntry user={auth.loggedUser} openTab={()=>{}} edit="true"/>
            </div>
            <ul className={ userList }>
                {users.map((user, nb)=>{
                    return <>
                    <li key={user._id}>
                        <UserListEntry user={user} openTab={()=>{checkAndSetActiveConversation(user.socketID)}} edit="false"/>
                    </li>
                    </>
                })}
            </ul>
        </div>
    )
}

export default Sidebar
