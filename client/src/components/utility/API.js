import axios from "axios";

// require('dotenv').config();

// const endpoint = process.env.APP_BACKEND; 

export default {
  getUsers: function() {
    return axios.get(`/api/users`);
  },
  checkUserData: function(email) {
    return axios.get(`/api/users/data/${email}`);
  },
  saveUserData: function(category, userData) {
    return axios.post(`/api/userdatas/${category}`, userData);
  },
  createDocument: function(email) {
    return axios.post(`/api/userdatas/create/${email}`);
  },
  createComparisonTime: function(email, userData) {
    console.log(userData);
    return axios.post(`/api/userdatas/createall/${email}`, userData);
  }
};
