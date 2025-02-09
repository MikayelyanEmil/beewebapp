export default interface IButton {
    variant: 'first' | 'second' | 'third';
    text: string;
    submit?: boolean;
    onClick?: () => void;
}