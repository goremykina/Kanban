import React  from "react";
import './textarea.sass'
export default function Textarea(props) {
    const onPressEnter = props.onPressEnter;
    const onPressEsc = props.onPressEsc;
    const onChange = props.onChange;
    const placeholder = props.placeholder
    const className = props.className
    const value = props.value

    const handlePressing = (event) => {
        const enterCode = event.keyCode;

        if (onPressEsc && enterCode === 27) {
            event.preventDefault();
            onPressEsc()
        }

        if (onPressEnter && enterCode === 13) {
            event.preventDefault();
            onPressEnter(event.target.value)
        }
    }
    const handleChange = (newValue) => {
        onChange(newValue);
    }

    return (
        <textarea
            placeholder={placeholder}
            className={className}
            value={value}
            onChange={e => handleChange(e.target.value)}
            onKeyDown={handlePressing}
        >
        </textarea>
    )
}