const axios = require("axios");

// Example: Make a GET request to displayAllUsers endpoint
const url = "http://localhost:4000/addUser";

// Example user data
const user1 = {
  firstName: "Prabhjot",
  lastName: "Sidhu",
  email: "prabhjotsidhu123@hotmail.com",
  country: "CA",
  city: "Guelph",
  region: "Ontario",
};

const user2 = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  country: "US",
  city: "New York",
  region: "NY",
};

const user3 = {
  firstName: "Kratos",
  lastName: "Singh",
  email: "singh.kratos@outlook.com",
  country: "FR",
  city: "Paris",
  region: "Central",
};

axios
  .post(url, user1)
  .then((response) => {
    console.log("Response status:", response.status);
    console.log("Response data:", response.data);
  })
  .catch((error) => {
    console.error("Error making HTTP request:", error.message);
  });

axios
  .post(url, user2)
  .then((response) => {
    console.log("Response status:", response.status);
    console.log("Response data:", response.data);
  })
  .catch((error) => {
    console.error("Error making HTTP request:", error.message);
  });

axios
  .post(url, user3)
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
