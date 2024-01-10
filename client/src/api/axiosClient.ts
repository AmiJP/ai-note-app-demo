import axios from "axios";
import { baseURL } from "./urls";
import { redirect } from "react-router-dom";

const axiosConfig = {
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
  withCredentials: true,
};

export const axiosClient = axios.create(axiosConfig);

axios.interceptors.request.use(
  function (request) {
    request.headers["Content-Type"] = "multipart/form-data";
    return request;
  },
  null,
  { synchronous: true }
);

axios.interceptors.response.use(
  function (response) {
    //Dispatch any action on success
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      // redirect to login if not authenticated
      redirect("/login");
    }
    return Promise.reject(error);
  }
);
