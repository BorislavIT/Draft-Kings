import axios from "axios";

const swapiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REACT_APP_SWAPI_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default swapiClient;
