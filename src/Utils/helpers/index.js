// Import the 'jwt' library for working with JSON Web Tokens and the 'JWT_SECRET' from a configuration file
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

// Import the 'setAuthToken' function from another module
import setAuthToken from "../setAuthToken";

// Define a function named 'checkIfTokenExpired' with an optional 'token' parameter
export const checkIfTokenExpired = (token = null) => {
  // Decode the token using the 'JWT_SECRET'
  const dec = jwt.decode(token, JWT_SECRET);

  // Check if the token has expired by comparing the current time with the token's expiration time
  if (Date.now() >= dec.exp * 1000) {
    console.log("new token generated");

    // If the token has expired, create a new token with an extended expiration time
    const payload = {
      _id: dec._id,
      name: dec.name,
      email: dec.email,
      role: dec.role,
      refresh_hash: dec.salt,
      avatar: dec.avatar || null
    };

    // Sign the new token with the 'JWT_SECRET' and set its expiration to 2 hours
    token = jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });
  }

  // Call the 'setAuthToken' function to set the updated token
  setAuthToken(token);

  // Return the updated token
  return token;
}

// Define a constant named 'defaultAdminImage' with a default URL for an admin user image
export const defaultAdminImage = "https://www.lansweeper.com/wp-content/uploads/2018/05/ASSET-USER-ADMIN.png"
