import { axios } from '../index';

const ITEM_SALE_URL="http://localhost:3333/api/cust/product/sale";
const headers = {
    'Content-Type': 'application/json',
    'custAppId': 1
  };

let config = {
    'headers': headers
}

export default {
    getAll() {
        return axios.get(ITEM_SALE_URL)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },

    
    getByDate(from, to) {
        return axios.get(ITEM_SALE_URL+'/filter', { params: { from, to }, headers: {
            'Content-Type': 'application/json',
            'custAppId': 1
          }})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },

    add(sale) {
        return axios.post(ITEM_SALE_URL, sale,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },

    update(id, data) {
        return axios.put(`sales/${id}`, data)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    }
};