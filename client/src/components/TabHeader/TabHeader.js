import React, { useEffect } from 'react'
import _ from 'lodash'
import { tabs, active } from './TabHeader.module.scss'
import { useUserList } from '../../providers/UserListContext'

function TabHeader({openConversations, activeTab, openTab, closeTab}) {

    const { userList, setUserList } = useUserList();

    console.log(openConversations);
    console.log(userList);

    return (
        <ul className={tabs}>
            { openConversations.length >0 && activeTab != undefined && openConversations.map((socketID, index)=>{
                var user = _.find(userList,['socketID',socketID])
                return <>
                    <li key={ user.socketID } className={(user.socketID == activeTab) ? active : null} onClick={(e) => openTab(user.socketID)}>
                        <span >{user.username}</span>
                        <a className="close" onClick={(e) => closeTab(e, user.socketID, index)}>&times;</a>
                    </li>
                </>
            })}
        </ul>
    )
}

export default TabHeader
