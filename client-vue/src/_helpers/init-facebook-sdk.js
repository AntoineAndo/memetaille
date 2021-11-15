import { userService, fbService } from '../_services';

const facebookAppId = process.env.VUE_APP_FACEBOOK_APP_ID;

function initFacebookSdk() {
  return new Promise(resolve => {
    // wait for facebook sdk to initialize before starting the vue app
    window.fbAsyncInit = () => {
      FB.init({
        appId: facebookAppId,
        cookie: true,
        xfbml: true,
        version: 'v8.0',
      });

      // auto authenticate with the api if already logged in with facebook
      FB.getLoginStatus(({ authResponse }) => {
        if (authResponse) {
          fbService.apiAuthenticate(authResponse.accessToken, (user) => {
            userService.loginSession(user);
            resolve();
          });
        } else {
          resolve();
        }
      });
    };

    // load facebook sdk script
    (function (d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      const js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  });
}

export default initFacebookSdk;
