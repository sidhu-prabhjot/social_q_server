const axios = require("axios");

// Example: Make a GET request to displayAllUsers endpoint
const url = "http://localhost:4000/addUser";

// Example user data
const userData = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  country: "US",
  city: "New York",
  region: "NY",
};

axios
  .post(url, userData)
  .then((response) => {
    console.log("Response status:", response.status);
    console.log("Response data:", response.data);
  })
  .catch((error) => {
    console.error("Error making HTTP request:", error.message);
  });

const urlAllUsers = "http://localhost:4000/displayAllUsers";

axios
  .get(urlAllUsers)
  .then((response) => {
    console.log("Response status:", response.status);
    console.log("Response data:", response.data);
  })
  .catch((error) => {
    console.error("Error making HTTP request:", error.message);
  });
