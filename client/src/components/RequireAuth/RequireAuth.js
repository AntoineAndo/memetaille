import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../providers/ProvideAuth';

function RequireAuth({children, redirectTo}) {
    let auth = useAuth();

    if(auth.loggedUser._id == undefined){
        return <Navigate replace to="/login" />
    }else{
        return children;
    }

}

export default RequireAuth
