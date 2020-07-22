import axios from 'axios';
let axiosInstance = axios.create({
    baseURL: 'https://enrouteservice.com/api/',
    timeout: 10000,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  });
  axiosInstance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if (error.response.status===500) {
        //do something
    }
    if (error.response.status === 400) {
        //do something
    }
    if (error.response.status === 401) {
        //do something
    }
    if (error.response.status === 404) {
        //do something
    }
    
    return Promise.reject(error);
  });
  axiosInstance.interceptors.request.use(
    reqConfig => {
      if (!reqConfig.url.includes('/token-auth'))
      {
        reqConfig.headers['Authorization'] = `JWT ${localStorage.getItem('token')}`
        reqConfig.headers['Organization'] = localStorage.getItem('organizationId');
        return reqConfig;
      }
    },
    err => Promise.reject(err),
  );
export default axiosInstance;
