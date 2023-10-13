// Import the Axios library for making HTTP requests
import axios from "axios";

// Define a function to get bookings for the owner
export const getOwnerBookings = () => axios.get("/bookings/my");

// Define a function to get all bookings
export const getAllBookings = () => axios.get("/bookings/all");

// Define a function to remove a booking by its ID
export const removeBooking = (id) => axios.delete(`/bookings/${id}`);

// Define a function to change the verification status of a booking
export const changeVerificationStatus = (bookingId, status) =>
  axios.patch(`/bookings/${bookingId}`, { verification: status });

// Define a function to post a sold seat for a specific booking
export const postSoldSeat = (slug, seat) =>
  axios.post(`/bookings/sold/${slug}`, { seatNumber: seat });
