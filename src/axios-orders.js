import axios from 'axios';

const axiosOrder = axios.create( 
    {
        baseURL: "https://burger-app-js-918ef-default-rtdb.firebaseio.com/"
    }
);

export default axiosOrder;