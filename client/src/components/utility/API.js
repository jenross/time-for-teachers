import axios from "axios";

export default {
  getUsers: function() {
    return axios.get("http://teachers.timeforteachers.us/api/users");
  },
  checkUserData: function(email) {
    return axios.get(
      `http://teachers.timeforteachers.us/api/users/data/${email}`
    );
  },
  saveUserData: function(category, userData) {
    return axios.post(
      `http://teachers.timeforteachers.us/api/userdatas/${category}`,
      userData
    );
  },
  createDocument: function(email) {
    return axios.post(
      `http://teachers.timeforteachers.us/api/userdatas/create/${email}`
    );
  },
  createComparisonTime: function(email, userData) {
    console.log(userData);
    return axios.post(
      `http://teachers.timeforteachers.us/api/userdatas/createall/${email}`,
      userData
    );
  }
};
