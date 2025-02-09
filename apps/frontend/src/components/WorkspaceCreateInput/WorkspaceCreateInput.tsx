import Image from "next/image";
import closeIcon from '@/assets/close.svg';
import Button from "../Button/Button";

export default function WorkspaceCreateInput() {
    return (
        <div className="workspace-create-popup">
            <form method='post' className="workspace-create-form">
                <button className="close-form-btn">
                    <Image src={closeIcon} width={18} height={18} alt='close' />
                </button>
                <div className="workspace-create-input">
                    <div>Name</div>
                    <textarea className="textarea-title" name="" id="title"></textarea>
                    <br />
                    <div>Description</div>
                    <textarea className="textarea-description" name="" id="description"></textarea>
                </div>
                <br />
                <Button text='Save' variant='second' />
                <br />
                <br />
            </form>
        </div>
    )
}