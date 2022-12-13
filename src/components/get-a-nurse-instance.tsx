import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:4001/Nurses',
}); 

instance.interceptors.request.use(config => {
  config.params = {
   // add your default ones
   
   // spread the request's params
    ...config.params,
  };
  return config;
});

export default instance;