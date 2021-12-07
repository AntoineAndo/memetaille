import { createContext, useContext, useState } from 'react'


const userListContext = createContext();

export function UserListContext({ children }) {
    const [userList, setUserList] = useState([])

    return (
        <userListContext.Provider value={{userList, setUserList}}>
            {children}
        </userListContext.Provider>
    )
}


export const useUserList = () => {
    return useContext(userListContext);
}