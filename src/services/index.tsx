import axios from "axios";

export const api = axios.create({
  // baseURL: `https://${window.location.href}:4443/`,
  baseURL: `https://saas.hreports.com.br:4443/`,
});
