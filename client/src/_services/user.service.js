// import config from 'config';
import { createContext, useContext, useReducer } from 'react'
import { useAuth } from '../providers/ProvideAuth';

function _handleResponse(response) {
    return response.text().then((text) => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        if (response.status === 401) {
          // auto logout if 401 response returned from api
          // logout();
          // window.location.reload(true);
        }
  
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      return data;
    });
}

function useUserService(){
    const auth = useAuth();

    const getUsers = (cb) => {
        const requestOptions = {
            method: "GET",
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${auth.token}`
            }
        }
    
        fetch(`http://localhost:3000/users/`, requestOptions)
            .then(_handleResponse)
            .then(data => {
                cb(data)
            }).catch(error =>{
                console.error(error)
                if(error == "Token expired"){
                    auth.signout();
                    window.location = "/login";
                }
            });
    
    }


    const updateUser = (id, formData, cb) => {
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${auth.token}`,
            },
            body: JSON.stringify(formData),
        }

        fetch(`http://localhost:3000/users/${id}`, requestOptions)
            .then(_handleResponse)
            .then(data => {
                cb(data);
            }).catch(error =>{
                console.error(error)
                if(error == "Token expired"){
                    auth.signout();
                    window.location = "/login";
                }
            });
            
    }

    return {
        getUsers,
        updateUser
    }
    
}

export default useUserService;