const localStorageService = {
  setWithExp: (key, value, expiration) => {
    const date = new Date();
    const item = {
      value: value,
      expiration: date.getTime() + (expiration * 1000)
    };
    localStorage.setItem(key, JSON.stringify(item));
  },
  getWithExp: key => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const date = new Date();
    if(date.getTime() > item.expiration){
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  }
}

export default localStorageService;
