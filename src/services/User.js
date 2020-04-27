import siteConstants from "../helpers/site_constants";
import authHeader from "../helpers/auth-header";

const userService = {
  logIn: ({email, password}) => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({user: {email: email, password: password}})
    };

    return fetch(`${process.env.REACT_APP_API_URL}/users/authenticate`, requestOptions).then(
      requestSuccess => {
        if(requestSuccess.ok){
          return requestSuccess.json().then(parsedData => {return parsedData});
        }
        return requestSuccess.json().then(parsedData => {return Promise.reject(parsedData)});
      },
      () => {
        return Promise.reject({error: 'Service unavailable'});
      });
  },
  logOut: () => {
    localStorage.removeItem(siteConstants.TOKEN);
  },
  register: ({email, password, passwordConfirmation}) => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({user: {email: email, password: password, password_confirmation: passwordConfirmation}})
    };

    return fetch(`${process.env.REACT_APP_API_URL}/users`, requestOptions).then(
      requestSuccess => {
        if(requestSuccess.ok){
          return requestSuccess.json().then(parsedData => {return parsedData});
        }
        return requestSuccess.json().then(parsedData => {return Promise.reject(parsedData)});
      },
      () => {
        return Promise.reject({errors: ['Service unavailable']});
      });
  },
  userInformation: () => {
    const requestOptions = {
      method: 'GET',
      headers: authHeader()
    };

    return fetch(`${process.env.REACT_APP_API_URL}/authenticate/users/decode`, requestOptions).then(
      requestSuccess => {
        if(requestSuccess.ok){
          return requestSuccess.json().then(parsedData => {return parsedData});
        }
        return requestSuccess.json().then(parsedData => {return Promise.reject(parsedData)});
      },
      () => {
        return Promise.reject({error: 'Service unavailable'});
      });
  }
};

export default userService;
