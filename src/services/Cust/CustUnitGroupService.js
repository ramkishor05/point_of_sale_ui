import { axios } from '../index';

import { PRODUCTION_BASE_URL, PRODUCTION_APP_ID} from '../../globals/constants'

const CUST_UNIT_GROUP_URL=`${PRODUCTION_BASE_URL}/api/cust/unitgroup`;

const headers = {
    'Content-Type': 'application/json',
    'custAppId': PRODUCTION_APP_ID
  };
export default {
    getAll() {
        return axios.get(CUST_UNIT_GROUP_URL,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },

    getByDate(from, to) {
        return axios.get(CUST_UNIT_GROUP_URL+'/filter', { params: {from, to} },{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },

    add(unit) {
        return axios.post(CUST_UNIT_GROUP_URL, unit,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },

    update(id, unit) {
        return axios.put(CUST_UNIT_GROUP_URL+`/${id}`, unit,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },

    delete(id) {
        return axios.delete(CUST_UNIT_GROUP_URL+`/${id}`,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    }
};
