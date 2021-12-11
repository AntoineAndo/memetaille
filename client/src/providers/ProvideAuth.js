import { useContext, createContext } from 'react'

import useProvideAuth from '../_services/authentication.service'

const authContext = createContext();

export function ProvideAuth({ children }) {

    console.log('_ProvideAuth render')

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