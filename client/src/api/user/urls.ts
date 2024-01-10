import { baseURL } from "../urls";

export const baseUserURL = () => {
  const url = new URL(baseURL);
  url.pathname += "user/";
  return url;
};

export const registerUserURL = () => {
  const url = baseUserURL();
  url.pathname += "register/";
  return url;
};

export const loginUserURL = () => {
  const url = baseUserURL();
  url.pathname += "login/";
  return url;
};

export const logoutUserURL = () => {
  const url = baseUserURL();
  url.pathname += "logout/";
  return url;
};

export const getAccountURL = () => {
  const url = baseUserURL();
  url.pathname += "account/";
  return url;
};
