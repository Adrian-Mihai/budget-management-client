import siteConstants from "../helpers/site_constants";

const userService = {
  login: ({email, password}) => {
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
  logout: () => {
    localStorage.removeItem(siteConstants.TOKEN);
  }
};

export default userService;
