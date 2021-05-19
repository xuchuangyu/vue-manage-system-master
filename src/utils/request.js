import axios from 'axios';
import router from '../router';
import ElementUI from 'element-ui';
const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    timeout: 5000
});

service.interceptors.request.use(
    config => {
        console.log('config')
        console.log(config)
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        console.log('response')
        console.log(response)
    
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
      
    },
   async  error => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          let res=error.response.data;
          console.log(res);
          if(res.error_code==10006){
            console.log(10006)
           ElementUI.Notification({
                title: res.msg,
                message: '清退出重新登录',
                offset: 100
            })
            localStorage.removeItem('ms_username');
            router.push('/login');
          }else{
            return Promise.reject(res);
          }
       
    }
);

export default service;
