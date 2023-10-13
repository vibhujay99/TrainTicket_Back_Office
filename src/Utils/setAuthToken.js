// Import the Axios library for making HTTP requests and the 'API' constant from a configuration file
import axios from "axios";
import { API } from "./config";

// Define a function named 'setAuthToken' that takes a 'token' parameter
const setAuthToken = (token) => {
  // Check if a 'token' is provided
  if (token) {
    // If a 'token' is provided, set it in the request headers with the "Bearer" scheme
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    // If no 'token' is provided, delete the "Authorization" header from the request
    delete axios.defaults.headers.common["Authorization"];
  }
  
  // Set the base URL for Axios requests to the value of 'API' from the configuration
  axios.defaults.baseURL = API;
};

// Export the 'setAuthToken' function as the default export of this module
export default setAuthToken;
