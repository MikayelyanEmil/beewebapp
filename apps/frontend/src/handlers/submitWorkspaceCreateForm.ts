import { api } from "@/http";
import axios from "axios";

export default async function submit(
    event: any, 
    setWorkspaces: React.Dispatch<React.SetStateAction<any[]>>,
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>,
    setSuggestion: React.Dispatch<React.SetStateAction<string>>,
) {
    event.preventDefault();
    try {
        const body = { title: event.target.title.value, name: event.target.title.value }
        const response = await api.post(`workspaces/${body.title}`, body);
        console.log(response.data)
        if (response.data.slug) {
            setSuggestion(prev => response.data.slug);
        }
        else {
            setShowForm(prev => !prev);
            setWorkspaces(prev => [...prev, response.data.data]);
        }
        console.log(response.data.data)
    } catch(error) {
        if (axios.isAxiosError(error)) {
            let message = error.response?.data?.message;
            if (error.code == 'ERR_BAD_REQUEST') {
            }
            console.log(error, message);
          }
    }
}