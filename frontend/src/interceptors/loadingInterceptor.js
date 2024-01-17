import axios from "axios";

export const setLoadingInterceptor = ({ showLoading, hideLoading }) => {
  // set up the interceptor for the request that goes to server.
  // request going to the server
  axios.interceptors.request.use(
    (req) => {
      showLoading();
      return req;
    },
    (error) => {
      hideLoading();
      return Promise.reject(error); // shorthand of
    }
  );
  // response coming from the server
  axios.interceptors.response.use(
    (res) => {
      hideLoading();
      return res;
    },
    (error) => {
      hideLoading();
      return Promise.reject(error);
    }
  );
};

export default setLoadingInterceptor;