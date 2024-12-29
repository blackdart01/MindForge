import axios from "axios";

const instance = axios.create({
    // baseURL: 'http://localhost:8090',
    baseURL: 'https://mindforge-backend.onrender.com',
    headers: {
        'content-type': 'application/octet-stream'
    },
});
export default {
    getAllData: () =>
        instance({
            'method': 'GET',
            'url': '/api/documents/getAll',
            'headers': {
                'content-type': 'application/json'
            },
            transformResponse: [function (data) {
                console.log('Transforming data...')
                const json = JSON.parse(data)
                return json;
            }],
        }),
    saveDocumentData: (formData) =>        
        instance({
            'method': 'POST',
            'url': '/api/documents/save',
            'data': formData,
            'headers': {
                'content-type': 'application/json'
            }
        }),
    updateTestStatus: (id, status) =>
        instance({
            'method': 'POST',
            'url': `/api/documents/updateTestStatus/${id}?status=${status}`,
            'headers': {
                'content-type': 'application/json'
            }
        }),
    updateTestProgress: (id, progress) =>
        instance({
            'method': 'POST',
            'url': `/api/documents/updateTestProgress/${id}?progress=${progress}`,
            'headers': {
                'content-type': 'application/json'
            }
        })
}