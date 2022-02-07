import axios from "axios";

const client = axios.create({ baseURL: "http://3.38.246.151:8133/api/v1" });

export const request = ({ ...options }) => {
  //client.defaults.headers.common.Authorization = `Basic token jun`;
  const onSuccess = (response) => response;
  const onError = (error) => error;
  return client(options).then(onSuccess).catch(onError);
};
