import axios from 'axios'


const API = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
}
});
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token" );
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;  
  });
  
  //Login API
export const loginUser = (data)=> API.post('/auth/login', data);

//Register API
export const registerUser = (data)=> API.post('/auth/register', data);
//////////////////////////////////////////////////////////////////////

export const getAdminStatus = () => API.get('/admin/status');
export const staffList = () => API.get('/employee')


export default API;