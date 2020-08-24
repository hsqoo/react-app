import axios from 'axios'
import qs from 'qs'

const baseUrl = "";

function callApi (endpoint, postParam, method) {
    let fullUrl = (endpoint.indexOf(baseUrl) === -1) ? baseUrl + endpoint : endpoint;
    let parseParams = qs.stringify(postParam);
    return new Promise((resolve, reject) => {
        if (method === 'GET'){
            fullUrl += '&' + parseParams;
            axios.get(fullUrl)
                .then(res=> {
                    if(res.statusCode ==200){
                        resolve(res)
                    }else {
                        console.log(res)
                        reject(res)
                    }
                }).catch(err=> {
                    console.log(err)
                    reject(err)
                });
        }
    
    })
}

export const login = (postParam) => callApi(`/login/cellphone`, postParam);