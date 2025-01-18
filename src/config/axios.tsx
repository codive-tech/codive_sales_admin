import axios, { AxiosRequestConfig } from 'axios';

// Create Axios instance
const apiClient = axios.create({
    baseURL: 'https://api.codive.co', // Your API base URL
});

// Add request interceptor to attach the token to every request
apiClient.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // Retrieve the token dynamically (e.g., from localStorage or context)
        const token = localStorage.getItem('token'); // Replace with your token logic

        if (token) {
            config.headers['x-auth'] = token; // Attach token to the x-auth header
        }

        // Optionally, add any other headers
        config.headers['Content-Type'] = 'application/json';

        return config;
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
);

export default apiClient;
