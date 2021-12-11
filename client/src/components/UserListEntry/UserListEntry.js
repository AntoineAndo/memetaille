import { userDetail } from './UserListEntry.module.scss'


function UserListEntry({user, openTab}) {

    console.log("_______UserListEntry render");
    
    return (
        <>
            <div className={ userDetail } onClick={openTab}>
                <p className="username">{ user.username }<span>{ user.height }cm</span></p>
                <p className="status">{ user.status }</p>
            </div>
        </>

    )
}

export default UserListEntry
