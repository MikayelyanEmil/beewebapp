import IButton from "../../interfaces/components/Button";
import styles from './Button.module.css';

const Button: React.FC<IButton> = ({ variant = 'first', text, submit, onClick }) => {
    return <button type={submit ? 'submit' : 'button'} className={`app-button variant-${variant}`} onClick={onClick}>{text}</button>
}
export default Button;