function logout() {
  localStorage.removeItem('user');
}

function handleResponse(response) {
  console.log('RESPONSE');
  console.log(response);
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}

function login(email, password, cb) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  };

  fetch(`${process.env.VUE_APP_API_URL}/users/login`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      // login successful if there's a jwt token in the response
      if (user.token) {
        console.log(user);
        localStorage.setItem('user', JSON.stringify(user));
        cb(user);
      }
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

function getUser(user, token, cb) {
  let options;
  if (token) {
    options = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  } else {
    options = {
      'Content-Type': 'application/json',
    };
  }
  const requestOptions = {
    method: 'GET',
    headers: options,
  };

  return fetch(`${process.env.VUE_APP_API_URL}/users/${user}`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      console.log(data);
      // login successful if there's a jwt token in the response
      /*
      if (user.token) {
        localStorage.setItem('user', JSON.stringify(user));
        console.log(localStorage);
      }
      */
      cb(null, data._doc);
    });
}

export const userService = {
  login,
  register,
  getUser,
};
