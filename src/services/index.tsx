import axios from "axios";

export const api = axios.create({
  baseURL: `https://saas.hreports.com.br:4443/`,
  // baseURL: `/`,
});
