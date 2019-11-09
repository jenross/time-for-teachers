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
  saveUserData: function(category, userData) {
    // console.log("The Category", category);
    // console.log("data", userData);
    return axios.post(`/api/userdatas/${category}`, userData);
  },
  findDocument: function(email) {
    return axios.get(`/api/userdatas/${email}`);
  },
  createDocument: function(email) {
    return axios.post(`/api/userdatas/create/${email}`);
  }
};
