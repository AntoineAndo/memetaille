// import config from 'config';

function handleResponse(response) {
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

function login(email, password, done){
    const requestOptions = {
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({email, password}),
    }

    console.log('LOGIN')

    fetch(`http://localhost:3000/auth/login`, requestOptions)
        .then(handleResponse)
        .then(data => {
          console.log(data)
            if(!data.user){
                done({
                  message:'Incorrect Email or Password'
                }, null);
            }else{
              localStorage.setItem('user', JSON.stringify(data.user));
              localStorage.setItem('token', data.token);
              done(null,data.user);
            }
        })
}

export default {login}