import { axios } from '../index';
import { PRODUCTION_BASE_URL, PRODUCTION_APP_ID} from '../../globals/constants'

const CUST_CATEGERY_GROUP_URL=`${PRODUCTION_BASE_URL}/api/cust/categorygroup`
const headers = {
    'Content-Type': 'application/json',
    'custAppId': PRODUCTION_APP_ID
};

export default {
    getAll() {
        return axios.get(CUST_CATEGERY_GROUP_URL,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    find(minimum){
        return axios.get(CUST_CATEGERY_GROUP_URL+'/find', { params: { minimum } },{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    add(item) {
        return axios.post(CUST_CATEGERY_GROUP_URL, item,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    update(id, item) {
        item['id']=id;
        return axios.put(CUST_CATEGERY_GROUP_URL, item,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    delete(id) {
        return axios.delete(CUST_CATEGERY_GROUP_URL+`/${id}`,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    }
};