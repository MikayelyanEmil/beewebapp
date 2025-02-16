import axios from "axios";
import { FormEvent } from "react";
import { api } from "@/http";
import SubmitAuthOptions from "@/interfaces/SubmitAuthOptions";

export default async function submit(e: FormEvent, options : SubmitAuthOptions): Promise<void> {
    e.preventDefault();
    let { form, newUser, setErrorMessage } = options;
    const { inputEmail, inputFullname, inputPassword, inputUsername } = form;
    const endpoint = 'auth/' + (newUser ? 'signup' : 'login');
    try {
        const data = { email: inputEmail.current.value, password: inputPassword.current.value, full_name: inputFullname?.current?.value, username: inputUsername?.current?.value };
        const response = await api.post(endpoint, data);
        localStorage.setItem('token', response.data.access_token);
        window.location.href = '/';
    } catch (error) {
        if (axios.isAxiosError(error)) {
            let message = error.response?.data?.message;
            if (error.code == 'ERR_BAD_REQUEST') {
                if (typeof message == "object") message = message.join(' ');       
                setErrorMessage(message)
                setTimeout(() => setErrorMessage(''), 1500);
            }
            console.log(error, message);
        }
    }
}