import axios from "axios";

const instance = axios.create({
    // baseURL: 'http://localhost:8090/api/documents',
    baseURL: 'https://mindforge-backend.onrender.com/api/documents',
    headers: {
        'content-type': 'application/octet-stream'
    },
});
export default {
    getData: () =>
        instance({
            'method': 'GET',
            'url': '/getAll',
            'headers': {
                'content-type': 'application/json'  // override instance defaults
            },
            transformResponse: [function (data) {
                console.log('Transforming data...')
                const json = JSON.parse(data)
                return json;
            }],
            // 'params': {
            //     'search': 'parameter',
            // },
        }),
    postData: () =>
        instance({
            'method': 'POST',
            'url': '/api',
            'data': {
                'item1': 'data1',
                'item2': 'item2'
            },
            'headers': {
                'content-type': 'application/json'  // override instance defaults
            }
        })
}