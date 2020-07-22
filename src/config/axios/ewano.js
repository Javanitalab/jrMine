import axios from 'axios';
let ewanoInstance = axios.create({
    baseURL: 'https://api-ebcom.mci.ir/services',
    timeout: 10000,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  });
  ewanoInstance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    // if (error.response.status===500) {
    //     //do something
    // }
    // if (error.response.status === 400) {
    //     //do something
    // }
    // if (error.response.status === 401) {
    //     //do something
    // }
    // if (error.response.status === 404) {
    //     //do something
    // }
    
    return Promise.reject(error);
  });
  ewanoInstance.interceptors.request.use(
    reqConfig => {
        reqConfig.headers['Authorization'] = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJlY20tYWRtaW4iLCJpYXQiOjE1OTM4NTUxNjAsImp0aSI6IjVhMWIyMzkxLTM1OTQtNGI0Yi04N2ExLTY5MmRlYmY2OGZiZSIsIm5iZiI6MTU5Mzg1NTE2MCwic2NvcGUiOiJhIGIiLCJkYXRhIjp7InVzZXJJZCI6ImJiMmQzZTcxLWI5NDMtNGNhMC04ZDRiLWYwNzYzNzUyNTg2YSIsImNsaWVudElkIjoiZjQyMWFlMzItZWIzZi00N2Y3LWE2NWUtYTA4OGExNWEzNzcwIn0sImV4cCI6MzE4NzcxMTIyMCwiaXNzIjoiYXV0aC5lYmNvbS5pciJ9.hZXP3c0qh0vI5cIdMVCZohN9oiVWqPS5BsrjgECh-GORCYzMqlXi8TqE430Ol5tIAnn6dH769Q-tXz0qGKoTShjU7T6YqAi4meSRnbrriJlmytAXkcdyUDvXi5mukT9O2Hv43cGldu4SM4v48sg4R0d6ViPeVse1HpE6yme0-Fv1ff_XyiFlkbwniW6b6xqWdfoqVk2VU0_zyZz60mlJaPkiAMnl-RyV-2eMnQuFwMJp1eEiSUz2gUevVAB10poYYoN9Iom3sra5yM_b6iMiq4uInXNuJqErZ9G3SIfDDd1W2Btd9f4wlBX-log1J6JDztzbrtCL-pUkSYBb6LizAQ`;
        return reqConfig;
    },
    err => Promise.reject(err),
  );
export default ewanoInstance;
