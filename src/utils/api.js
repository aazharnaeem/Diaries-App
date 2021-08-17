import axios from "axios";


const http = axios.create({
    baseURL: 'http://localhost:8080',
});

http.defaults.headers.post['Content-Type'] = 'application/json'

http.interceptors.response.use(
    async (response) => {
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }
    },
    (error) => {
        const { response, request } = error;
        if (response) {
            if (response.status >= 400 && response.status < 500) {
                alert(response.data?.data?.message, 'error')
                return null;
            }
        } else if (request) {
            console.log(request)
            alert('Request failed. Please try again.', 'error')
            return null;
        }
        return Promise.reject(error)
    }
);
export default http