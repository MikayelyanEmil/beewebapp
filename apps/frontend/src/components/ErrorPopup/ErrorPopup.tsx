import React from "react";

const ErrorPopup: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className={'errorPopup'}>
      <div className={'errorContent'}>
        <span className={'errorMessage'}>{message}</span>
      </div>
    </div>
  );
}

export default ErrorPopup;