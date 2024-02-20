import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REACT_APP_SWAPI_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
