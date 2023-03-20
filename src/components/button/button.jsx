import React from "react";
import './button.sass';

export default function Button({ buttonName, btnClass, onClick, icon, disabled }) {
    const Icon = icon;
    return (
        <button className={btnClass} onClick={onClick} disabled={disabled}>
            {icon &&  <Icon/>}
            {buttonName}
        </button>
    )
}
