import IInput from "../../interfaces/components/Input";
import styles from './Input.module.css';

const Input: React.FC<IInput> = ({ type, reff }) => {
    return (
        <>
            <div><label htmlFor={type}>{type}</label></div>
            <div><input className={'app-input'} ref={reff} type={(type != "email" && type != "password") ? "text" : type} name={type} /></div>
        </>
    )
}
export default Input;
