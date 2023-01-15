import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://engineering-task.elancoapps.com/api',
    headers: {
        'content-type':'application/json',
    },
});

const api = {
    getData: () =>
    instance({
        'method':'GET',
        'url':'/raw',  
    }),
    getApplications: () =>
    instance({
        'method':'GET',
        'url':'/applications',
    }),
    getResources: () =>
    instance({
        'method':'GET',
        'url':'/resources',
    }),
    getApplicationDetails: (value) =>
    instance({
        'method':'GET',
        'url':`/applications/${value}`,
    }),
    getResourceDetails: (value) =>
    instance({
        'method':'GET',
        'url':`/resources/${value}`,
    }),
}

export default api