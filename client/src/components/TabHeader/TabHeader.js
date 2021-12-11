import React from 'react'
import _ from 'lodash'
import { tabs, active } from './TabHeader.module.scss'

function TabHeader({openConversations, openTabAction, closeTabAction}) {
    
    console.log("______TabHeader render");
    console.log(openConversations)

    return (
        <ul className={tabs}>
            { openConversations.size >0 && [...openConversations].map((mapEntry, index)=>{
                const conversation = mapEntry[1];
                return <>
                    <li key={ conversation.user._id } className={(conversation.user.active == true) ? active : null} onClick={(e) => openTabAction(conversation.user._id)}>
                        <span >{conversation.user.username}</span>
                        <a className="close" onClick={(e) => closeTabAction(e, conversation.user._id, index)}>&times;</a>
                    </li>
                </>
            })}
        </ul>
    )
}

export default TabHeader
