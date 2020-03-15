import axios from 'axios'

const root = axios.create({
    baseURL: '/api',
    timeout: 5000
});

function get(path, query) {
    return new Promise((resolve, reject) => {
        root.get(path, {
            params: query
        }).then(response => {
            resolve(response.data);
        }).catch(error => {
            reject(error);
        });
    });
}

function post(path, data) {
    return new Promise((resolve, reject) => {
        root.post(path, data).then(response => {
            resolve(response.data);
        }).catch(error => {
            reject(error);
        });
    });
}

export default {
    root,
    post,
    get
};