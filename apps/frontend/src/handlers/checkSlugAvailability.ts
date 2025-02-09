import { api } from "@/http";
import axios from "axios";

export default async function checkSlugAvailability(e: any, setSuggestion: React.Dispatch<React.SetStateAction<string>>) {
    e.preventDefault();
    try {
        const slug = e.target.value.trim();
        if (!slug) return;
        const response = await api.get(`workspaces/check-slug/${slug}`);
        if (response.data.slug) setSuggestion(response.data.slug);
        else setSuggestion('');
        console.log(response.data)
    } catch(error) {
        if (axios.isAxiosError(error)) {
            if (error.status == 401) window.location.href = '/auth';
            let message = error.response?.data?.message;
            if (error.code == 'ERR_BAD_REQUEST') {
            }
            console.log(error, message);
        }
    }
};