import { useContext, createContext } from 'react'

import useProvideAuth from '../_services/authentication.service'

const authContext = createContext("default value");

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(authContext);
}