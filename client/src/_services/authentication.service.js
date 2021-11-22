// import config from 'config';
import { createContext, useContext, useState, useReducer } from 'react'

const authContext = createContext();

function useAuth() {
  return useContext(authContext);
}

function _handleResponse(response) {
    return response.text().then((text) => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        if (response.status === 401) {
          // auto logout if 401 response returned from api
          //logout();
          window.location.reload(true);
        }
  
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      return data;
    });
  }

const userReducer = (state, data)=>{
  console.log(data);
  localStorage.setItem('user',JSON.stringify(data));
  return data;
}

const tokenReducer = (state, data)=>{
  localStorage.setItem('token', data);
  return data;
}

function useProvideAuth() {
  const initialUserValue = (localStorage.getItem('user') != null) ? JSON.parse(localStorage.getItem('user')) : {}
  const initialTokenValue = (localStorage.getItem('token') != null) ? localStorage.getItem('token') : ""
  const [loggedUser, setLoggedUser] = useReducer(userReducer, initialUserValue);
  const [token, setToken] = useReducer(tokenReducer, initialTokenValue);

  const login = (email, password, done)=>{
    const requestOptions = {
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({email, password}),
    }

    fetch(`http://localhost:3000/auth/login`, requestOptions)
        .then(_handleResponse)
        .then(data => {
            if(!data.user){
                done({
                  message:'Incorrect Email or Password'
                }, null);
            }else{
              /*
              localStorage.setItem('user', JSON.stringify(data.user));
              localStorage.setItem('token', data.token);
              */
              setToken(data.token)
              setLoggedUser(data.user);

              done(null,data.user);
            }
        })
  }  

  const updateLoggedUser = (user) => {
    setLoggedUser(user);
  }

  const signout = () => {
    setLoggedUser(false);
    setToken("");
  }

  return {
    loggedUser,
    token,
    updateLoggedUser,
    login,
    signout
  }

}

export default useProvideAuth