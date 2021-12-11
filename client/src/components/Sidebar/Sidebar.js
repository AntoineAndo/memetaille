import { useEffect } from 'react'

import { sidebar, fixedUser, userList } from './Sidebar.module.scss';
import UserListEntry from '../UserListEntry/UserListEntry';
import { useAuth } from '../../providers/ProvideAuth';

import { useUserList } from '../../providers/UserListContext';

import { useConversationContext } from '../../providers/ConversationContext';
import _ from 'lodash'

function Sidebar({socket}) {
    const auth = useAuth();
    const { connectedUsersList, setConnectedUsersList } = useUserList();
    const { checkAndSetActiveConversation } = useConversationContext();

    console.log("_____Sidebar render");

    let users = connectedUsersList;

    //ComponentDidMount
    useEffect(() => {
        socket.on('user_list', users=>{

            //Exclude self
            _.remove(users, function(n) {
                return n._id == auth.loggedUser._id;
            });
    
           //Always take the last connection available to a user
            var _users = [];
    
            users.forEach((user)=>{
                let userInArray = _.find(_users, ['_id',user._id])
                //Check if this user is alreay present
                if(userInArray != undefined){
                    //Existing user's socketid is replace with the more recent one
                    userInArray.socketID = user.socketID
                }else{
                    //Adding the user into the array to be returned
                    _users.push(user);
                }
            })
    
            if(_users.length != connectedUsersList.lenght){
                setConnectedUsersList(_users);
            }
        })
    },[]);


    return (
        <div className={ sidebar }>
            <div className={ fixedUser }>
                <UserListEntry user={auth.loggedUser} openTab={()=>{}} />
            </div>
            <ul className={ userList }>
                {connectedUsersList.map((user)=>{
                    return <>
                        <li key={user._id}>
                            <UserListEntry user={user} 
                            openTab={()=>{ checkAndSetActiveConversation(user._id) }} /> 
                        </li>
                    </>
                })}
            </ul>
        </div>
    )
}

export default Sidebar
