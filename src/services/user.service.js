import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://srni.herokuapp.com/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "public");
  }

  getUserBoard() {
    return axios.get(API_URL + "usuario", { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "productos", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }
}

export default new UserService();
