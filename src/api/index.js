import axios from 'axios'
import qs from 'qs'

const baseUrl = "http://localhost:4000";

function callApi (endpoint, postParam, method) {
    // let fullUrl = (endpoint.indexOf(baseUrl) === -1) ? baseUrl + endpoint : endpoint;
    let cookie = window.localStorage.getItem('myMusicCookies');
    let fullUrl = baseUrl + endpoint;
    let timeStramp = + new Date();
    let parseParams;
    // parseParams = Object.assign(postParam,{timeStramp},{cookie});

    parseParams = qs.stringify(Object.assign(postParam,{timeStramp},{cookie}));
    // parseParams = qs.stringify(postParam);
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
            console.log(method)
            axios({
                method: method && method.toLowerCase() || 'POST',
                // withCredentials: true,
                // headers: { 'content-type': 'application/json;charset=utf-8' },
                url: fullUrl,
                data: parseParams,
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
// 登录
export const login = (postParam) => callApi(`/login/cellphone`, postParam, 'POST');
// 检查登录状态
export const checkLoginStatus = (postParam) => callApi(`/login/status`, postParam, 'GET');
// 获取我的歌单
export const getPlayList = (postParam) => callApi(`/user/playlist`, postParam, 'GET');
// 首页轮播图
export const getBanner = (postParam) => callApi(`/banner`, postParam, 'GET');
// 推荐歌单
export const personalized = (postParam) => callApi(`/personalized`, postParam, 'GET');