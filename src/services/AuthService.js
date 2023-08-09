import { axios } from './index';
const hostname = `192.168.29.222`;

var endpoint = `http://${hostname}:2222/api/auth/`;

export default {
    
    generateToken(user) {
        return axios.post(endpoint+'token/generate', user)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },

    validateToken(token) {
        return axios.post(endpoint+'token/validate', token)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    }
    ,

    expiredToken(token) {
        return axios.post(endpoint+'token/expired', token)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    }

};