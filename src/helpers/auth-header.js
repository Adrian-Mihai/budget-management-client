import localStorageService from "../services/LocalStorage";
import siteConstants from "./site_constants";

const authHeader = () => {
  const token = localStorageService.getWithExp(siteConstants.TOKEN);
  return token ? {'Content-Type': 'application/json', Authorization: `Bearer ${token}`} : {}
}

export default authHeader;
