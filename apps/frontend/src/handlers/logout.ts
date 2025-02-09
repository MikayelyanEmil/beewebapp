import { api } from "@/http";

export default async function logout() {
    try {
        const response = await api.post('auth/logout');
        console.log(response.data.refresh_token);
        localStorage.removeItem('token');
        window.location.href = '/auth';
    }
    catch (error) {
        console.log(error);
    }
}