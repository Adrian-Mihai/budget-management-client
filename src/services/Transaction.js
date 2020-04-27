import authHeader from "../helpers/auth-header";

const index = (user_UUID, page) => {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${process.env.REACT_APP_API_URL}/authenticate/users/${user_UUID}/transactions?page=${page}`, requestOptions).then(
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

const transactionService = {
  index
};

export default transactionService;
