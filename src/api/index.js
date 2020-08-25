import axios from 'axios'
import qs from 'qs'

const baseUrl = "http://localhost:3000";

function callApi (endpoint, postParam, method) {
    // let fullUrl = (endpoint.indexOf(baseUrl) === -1) ? baseUrl + endpoint : endpoint;
    let cookie = window.localStorage.getItem('myMusicCookies');
    let fullUrl = baseUrl + endpoint;
    let timeStramp = + new Date();
    let parseParams;
    parseParams = Object.assign(postParam,{timeStramp},{cookie});
    console.log(postParam, parseParams)

    parseParams = qs.stringify(postParam);
    return new Promise((resolve, reject) => {
        if (method === 'GET'){
            fullUrl += '?'
            fullUrl +=  parseParams + '&';
            axios.get(fullUrl)
                .then(res=> {
                    if(res.status ==200){
                        resolve(res)
                    }else {
                        // console.log(res)
                        reject(res)
                    }
                }).catch(err=> {
                    console.log('axios error', err)
                    reject(err)
                });
        } else {
            axios({
                method: method && method.toLowerCase() || 'post',
                url: fullUrl,
                data: postParam,
                success: ()=>{

                }
            }).then(res=> {
                if(res.status ==200){
                    resolve(res)
                }else {
                    console.log(res)
                    reject(res)
                }
            }).catch(err=> {
                console.log('axios error', err)
                reject(err)
            });
        }

    })
}

export const login = (postParam) => callApi(`/login/cellphone`, postParam, 'POST');
export const checkLoginStatus = (postParam) => callApi(`/login/status`, postParam, 'GET');
