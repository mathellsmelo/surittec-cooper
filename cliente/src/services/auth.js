import { ACCESS_TOKEN, ROLE } from '../contants';
import api from "./api";
export const isAuthenticated = () => localStorage.getItem(ACCESS_TOKEN) !== null;
export const getToken = () => localStorage.getItem(ACCESS_TOKEN);
export const getRole = () => localStorage.getItem(ROLE);

export const login = async (token) => {
    localStorage.setItem(ACCESS_TOKEN, token);
    const roleRes = await api.get('http://localhost:9090/api/auth/role');
    localStorage.setItem(ROLE, roleRes.data[0].authority);
};
export const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(ROLE);
};
