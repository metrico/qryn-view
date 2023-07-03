import React from "react";

export type ButtonProps = {
    onClick: (e?: any) => void;
    children: React.ReactNode;
};

const Button:React.FC<ButtonProps> = ({ onClick, children }) => {
    return (
        <div 
        style={{background:'red'}}
        onClick={onClick}>
            <>{children}</>
        </div>
    );
};

export default Button;
