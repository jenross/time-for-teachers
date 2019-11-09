import axios from "axios";

export default {
  getUsers: function() {
    return axios.get("/api/users");
  },
  saveUser: function(userData) {
    return axios.post("/api/users", userData);
  },
  getUserData: function(email) {
    return axios.get(`/api/users/data/${email}`);
  },
  saveUserData: function(userData) {
    return axios.post("/api/userdatas", userData);
  }
};
