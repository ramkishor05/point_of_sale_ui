import { axios } from '../index';
const hostname = `192.168.29.222`;
const GGLOBAL_CATEGERY_GROUP_URL=`http://${hostname}:3333/api/global/categorygroup`
export default {
    getAll() {
        return axios.get(GGLOBAL_CATEGERY_GROUP_URL)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    find(minimum){
        return axios.get(GGLOBAL_CATEGERY_GROUP_URL+'/find', { params: { minimum } })
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    add(item) {
        return axios.post(GGLOBAL_CATEGERY_GROUP_URL, item)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    update(id, item) {
        item['id']=id;
        return axios.put(GGLOBAL_CATEGERY_GROUP_URL, item)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    delete(id) {
        return axios.delete(GGLOBAL_CATEGERY_GROUP_URL+`/${id}`)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    }
};