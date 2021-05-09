import axios from "axios";

import { getTokenFromRefreshToken} from "../../services/user.service";
import {BASE_URL} from "../../constant";

const instance = axios.create({
  baseURL: BASE_URL,
});

let originalRequest = null;

instance.interceptors.response.use(
  (response) => response,
  async (err) => {
    console.log("on rejected middleware");

    console.log(err.response);
    if (
      err.response.status === 403 &&
      err.response.data.errorCode === "HB-0102"
    ) {
      originalRequest = err.config;
      console.log({
          originalRequest
      });
      console.log(err.response);

      // remove access token in local storage
      localStorage.removeItem("dut-accessToken");
      console.log("expired refresh token");

      try {
        // call api to get new access token from refresh token
        const res = await getTokenFromRefreshToken();
        console.log(res);
        //  store this one to local storage
          localStorage.setItem('dut-accessToken',res.data.accessToken);
          localStorage.setItem('dut-refreshToken',res.data.refreshToken);

          originalRequest = {
              ...err.config,
              headers : {
                  ...err.config.headers,
                  Authorization : 'Bearer ' +res.data.accessToken
              }
          }
          console.log(originalRequest);
            instance(originalRequest);


      } catch (error) {
        console.log(error);
        localStorage.removeItem("dut-refreshToken");
        return Promise.reject(error);

      }


    }
    return Promise.reject(err);
  }
);

export default instance;
