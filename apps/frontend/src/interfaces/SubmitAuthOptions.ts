export default interface SubmitAuthOptions {
    newUser: boolean;
    form: Form;
    setErrorMessage: React.Dispatch<string>;
}

export interface Form {
    inputEmail: React.MutableRefObject<any>;
    inputPassword: React.MutableRefObject<any>;
    inputUsername: React.MutableRefObject<any>;
    inputFullname: React.MutableRefObject<any>;
}
