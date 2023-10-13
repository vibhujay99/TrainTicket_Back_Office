// Import necessary modules and functions from external files and libraries
import axios from "axios";
import jwt from "jsonwebtoken";
import setAuthToken from "../setAuthToken";
import { JWT_SECRET, jwtKey } from "../config";
import {
  removeItemFromLocalStorage,
  getItemFromLocalStorage,
  setItemToLocalStorage,
} from "./LocalStorage";
import { checkIfTokenExpired } from "../helpers";

// Define a function for user signup using Axios
export const signUp = (user) => axios.post("/auth-owner/signup", user);

// Define a function for user sign-in using Axios
export const signIn = (user) => axios.post("/auth-owner/signin", user);

// Define a function for refreshing a user's token using Axios
export const refreshToken = (id) => axios.post("/auth-owner/refreshToken", { _id: id });

// Define a function for authenticating a user
export const authenticate = (data, next) => {
  // Check if the code is running in a browser environment
  if (typeof window !== "undefined") {
    // Store the JWT token in the local storage
    setItemToLocalStorage(jwtKey, JSON.stringify(data.data));
    // Set the authentication token using the 'setAuthToken' function
    setAuthToken(isAuthenticated().token);
    // Execute the 'next' function to proceed with user authentication
    next();
  }
};

// Define a function to check if a user is authenticated
export const isAuthenticated = () => {
  // Check if the code is not running in a browser environment
  if (typeof window == "undefined") {
    return false;
  }

  // Retrieve the JSON token from local storage
  let jsontoken = getItemFromLocalStorage(jwtKey);
  let data;

  if (jsontoken) {
    // Extract the 'token' from the JSON token
    let { token } = JSON.parse(jsontoken);

    // Verify the token's validity using the 'JWT_SECRET'
    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
      if (err) {
        if (err.expiredAt !== undefined) {
          // If the token has expired, renew it using the 'checkIfTokenExpired' function
          token = checkIfTokenExpired(token);
          data = { token, user: { ...jwt.decode(token, JWT_SECRET) } };
        } else {
          // If there is an error and it's not an expiration error, set 'data' to false and sign the user out
          data = false;
          signout();
        }
      } else {
        // If the token is valid, set 'data' to contain the token and user information
        data = { token, user: { ...decoded } };
      }
    });

    // Store the updated 'token' in local storage
    setItemToLocalStorage(jwtKey, JSON.stringify({ token }));
    return data;
  } else {
    return false;
  }
};

// Define a function for user signout
export const signout = () => {
  // Check if the code is running in a browser environment
  if (typeof window !== "undefined") {
    // Remove the JSON token from local storage and return 'true'
    removeItemFromLocalStorage(jwtKey);
    return true;
  }
};
