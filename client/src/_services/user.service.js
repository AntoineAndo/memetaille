function handleResponse(response) {
  console.log(response);
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        // logout();
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}

function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  };

  return fetch(`${process.env.VUE_APP_API_URL}/users/login`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      // login successful if there's a jwt token in the response
      if (user.token) {
        localStorage.setItem('user', JSON.stringify(user));
        console.log(localStorage);
      }

      return user;
    });
}

function register(email, password, username, height) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
      username,
      height,
    }),
  };

  return fetch(`${process.env.VUE_APP_API_URL}/users/register`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      console.log(user);
      // login successful if there's a jwt token in the response
      /*
      if (user.token) {
        localStorage.setItem('user', JSON.stringify(user));
        console.log(localStorage);
      }
      */
      return user;
    });
}

export const userService = {
  login,
  register,
};
