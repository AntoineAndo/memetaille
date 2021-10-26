import { userService } from './user.service';

function apiAuthenticate(accessToken, cb) {
  console.log(accessToken);
  console.log('ACCESS TOKEN');
  // authenticate with the api using a facebook access token,
  // on success the api returns an account object with a JWT auth token

  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: accessToken,
    }),
  };

  fetch(`${process.env.VUE_APP_API_URL}/auth/fb`, requestOptions)
    .then(userService.handleResponse)
    .then((user) => {
      cb(user);
      // accountSubject.next(account);
      // startAuthenticateTimer();
    });
}

async function login() {
  // login with facebook then authenticate with the API to get a JWT auth token
  const { authResponse } = await new Promise(FB.login);
  if (!authResponse) return true;

  apiAuthenticate(authResponse.accessToken, (user) => {
    // login successful if there's a jwt token in the response
    if (user.token) {
      loginSession(user);
      cb(user);
    }
  });

  // get return url from query parameters or default to home page
  // const returnUrl = router.history.current.query['returnUrl'] || '/';
  // console.log(returnUrl);
  return true;
  // router.push(returnUrl);
}

export const fbService = {
  login,
  apiAuthenticate,
};
