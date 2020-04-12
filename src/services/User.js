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
  }
};

export default userService;
