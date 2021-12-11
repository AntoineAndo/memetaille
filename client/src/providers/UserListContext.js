import { createContext, useContext, useState } from 'react'


const userListContext = createContext();

export function UserListContext({ children }) {
    const [connectedUsersList, setConnectedUsersList] = useState([])

    console.log("__UserListContext render")

    return (
        <userListContext.Provider value={{connectedUsersList, setConnectedUsersList}}>
            {children}
        </userListContext.Provider>
    )
}


export const useUserList = () => {
    return useContext(userListContext);
}