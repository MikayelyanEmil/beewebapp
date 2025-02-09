import Image from "next/image";
import closeIcon from '@/assets/close.svg';
import Button from "../Button/Button";
import IWorkspaceCreateInput from "@/interfaces/components/WorkspaceCreateInput";
import submit from "@/handlers/submitWorkspaceCreateForm";
import { useState } from "react";
import checkSlugAvailability from "@/handlers/checkSlugAvailability";


// function debounce(func: Function, delay: number) {
//     let timer;
//     return (...args) => {
//         clearTimeout(timer);
//         timer = setTimeout(() => func(...args), delay);
//     };
// }


const WorkspaceCreateInput: React.FC<IWorkspaceCreateInput> = ({ setWorkspaces, setShowForm }) => {
    const [suggestion, setSuggestion] = useState('');

    return (
        <div className="workspace-create-popup">
            <form method='post' className="workspace-create-form" onSubmit={(e) => submit(e, setWorkspaces, setShowForm, setSuggestion)}>
                <button className="close-form-btn" onClick={() => setShowForm(prev => !prev)}>
                    <Image src={closeIcon} width={18} height={18} alt='close' />
                </button>
                <div className="workspace-create-input">
                    {suggestion && <span className="suggest-name">That name is busy. Use this - {suggestion}</span>}
                    <div>Name</div>
                    <input className="slug-name" name="" id="slugName" type="text" onChange={(e) => checkSlugAvailability(e, setSuggestion)} />
                    <br />
                    <div>Description</div>
                    <textarea className="textarea-description" name="" id="description"></textarea>
                </div>
                <br />
                <Button text='Create' variant='second' submit={true} />
                <br />
                <br />
            </form>
        </div>
    )
}

export default WorkspaceCreateInput;