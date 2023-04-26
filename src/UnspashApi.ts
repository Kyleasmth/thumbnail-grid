import axios from "axios";

const UnsplashApi = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: "Client-ID bPfgiIw4vW72MUt72sWrzfIR4KSMdhe3J0brvyZqoCs",
  },
});

export default UnsplashApi;
