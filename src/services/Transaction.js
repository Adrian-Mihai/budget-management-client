import authHeader from "../helpers/auth-header";

const index = page => {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${process.env.REACT_APP_API_URL}/authenticate/users/transactions?page=${page}`, requestOptions).then(
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

const create = transaction => {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({
      transaction: {
        operator: transaction.operator,
        amount: transaction.amount,
        description: transaction.description
      }})
  };

  return fetch(`${process.env.REACT_APP_API_URL}/authenticate/users/transactions`, requestOptions).then(
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

const deleteTransaction = uuid => {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  };

  return fetch(`${process.env.REACT_APP_API_URL}/authenticate/users/transactions/${uuid}`, requestOptions).then(
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
  index,
  create,
  deleteTransaction
};

export default transactionService;
