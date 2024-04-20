import axios from 'axios'
import authConfig from '../configs/auth'
import { toast } from 'react-hot-toast';
const url = process.env.APIURL;

const userData = () => {
    return new Promise((res, rej) => {
        return res(JSON.parse(window.localStorage.getItem('userData')))
    })
}


const Get = async (uri, q = "") => {

    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName);
    if (storedToken) {
        return await axios
            .get(url + uri + q, {
                headers: {
                    Authorization: 'Bearer ' + storedToken
                }
            })
            .then(async response => {
                //  console.log(response.data)
                return response;
            }).catch((e) => {
                //   console.log(response.response.status);
                // console.log(e.response.data.responseCode);
                if (e.response.status === 401 && e.response.data.responseCode === 999) {
                    //  window.alert("Session Expire !");
                    toast.error("Session Expire. Please login again..")
                    window.location.replace("/");
                    //redirect('/');
                    // Response.Redirect('/', false);
                    // notFound();
                }
            })
    }
}

const Post = async (uri, data = {},contentType='application/json') => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName);
   // console.log(contentType)
    if (storedToken) {
        return await axios
            .post(url + uri, data, {
                headers: {
                    Authorization: 'Bearer ' + storedToken,
                    
                   // 'content-type': contentType,
                },

            })
            .then(async response => {
                // console.log(response.response.status);
                return response;
            }).catch((e) => {
                if (e.response.status === 401 && e.response.data.responseCode === 999) {
                    //  window.alert("Session Expire !");
                    toast.error("Session Expire. Please login again..")
                    window.location.replace("/");
                }
            })
    }
}
const PostPromise = async (uri, data = {}) => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName);
    return new Promise(async (res, rej) => {
        if (storedToken) {
            return await axios
                .post(url + uri, data, {
                    headers: {
                        Authorization: 'Bearer ' + storedToken
                    },

                })
                .then(async response => {
                    // console.log(response);
                    return res(response);
                }).catch((e) => {
                    console.log(e);
                })
        }
    })

}

export { Get, Post, url, userData, PostPromise }