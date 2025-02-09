'use client'
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import submit from "@/handlers/submitAuthForm";
import { useEffect, useRef, useState } from "react"

export default function Page() {
    // const [data, setData] = useState('');
    // useEffect(() => {
    //     fetch('api').then(res => res.text()).then(text => setData(text)).catch(e => setData('Error'))
    // }, [])

    const [newUser, setNewUser] = useState<boolean>(true);
    const inputEmail = useRef(null);
    const inputPassword = useRef(null);
    const inputUsername = useRef(null);
    const inputFullname = useRef(null);
    const form = { inputEmail, inputPassword, inputUsername, inputFullname };

    return <>
        <div id="auth-page">
            <div id='auth-form'>
                <h1>Bee<span>Web</span></h1><hr />
                <form onSubmit={(e) => submit(e, { form, newUser })}>
                    {newUser && <>
                        <Input type={'fullname'} reff={inputFullname} />
                    </>}
                    <Input type={'email'} reff={inputEmail} />
                    <Input type={'password'} reff={inputPassword} />
                    <Button submit={true} variant='first' text={newUser ? "Create Account" : "Log in"} />
                </form><hr />
                {newUser ? <>Already have an account ? <Button variant='third' text='Sign in' onClick={() => setNewUser(false)} /></> : <>Don't have an account ? <Button variant='third' text='Register' onClick={() => setNewUser(true)} /></>}
            </div>
        </div>
    </>;
}