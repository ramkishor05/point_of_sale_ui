import { axios } from '../index';

import { PRODUCTION_BASE_URL} from '../../globals/constants'

const GLOBAL_COUNT_FREQ_URL=`${PRODUCTION_BASE_URL}/api/global/countfreq`

export default {
    getAll() {
        return axios.get(GLOBAL_COUNT_FREQ_URL)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    find(minimum){
        return axios.get(GLOBAL_COUNT_FREQ_URL+'/find', { params: { minimum } })
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    add(item) {
        return axios.post(GLOBAL_COUNT_FREQ_URL, item)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    update(id, item) {
        item['id']=id;
        return axios.put(GLOBAL_COUNT_FREQ_URL, item)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    delete(id) {
        return axios.delete(GLOBAL_COUNT_FREQ_URL+`/${id}`)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    }
};