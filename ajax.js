
import axios from 'axios';


    // 正式环境接口转向
    // axios.defaults.baseURL = '//fengxiangxiang.eos.dev.enbrands.com';
    // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    // axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';

const ajax = (params) => {
    params.method = (params.method || 'GET').toLocaleUpperCase();
    if(params.method === 'GET' && params.data){
        params.params = params.data;
    }
    params.params = params.params || {};
    params.params.t = +new Date();

    return axios(params).then((res) => {

        if (res.data.code === 0) {
            return res.data;
        } else {
            if(res.code === 404){
                window.location.replace('/user/logout');
                return new Promise(()=>{});
            }

            return Promise.reject(res.data);
        }

    }, (error) => {
        if (error.response) {
            // The request was made and the server responded with a status code 
            // that falls out of the range of 2xx 
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);

            return Promise.reject({
                code: error.response.status,
                msg: error.message
            });

        } else if (error.request) {
            // The request was made but no response was received 
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of 
            // http.ClientRequest in node.js 

            return Promise.reject({
                code: '-1',
                msg: '服务无响应'
            });

        } else {
            // Something happened in setting up the request that triggered an Error 
            // console.log('Error', error.message);

            return Promise.reject({
                code: '-2',
                msg: error.message

            });

        }
    })
}

ajax.post = (url, data)=>{
    return ajax({
        method: 'POST',
        url,
        data
    })
}

ajax.get = (url, data)=>{
    return ajax({
        url,
        data
    })
}

export default ajax