import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://staging.pearl.design/ProductService/'
});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';
// instance.defaults.headers.common['Access - Control - Allow - Origin'] = ' * ';

export default instance;