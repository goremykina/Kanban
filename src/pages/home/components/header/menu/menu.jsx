import React, { useState } from "react";
import  { ReactComponent as User } from "./Vector.svg"
import  classes from './menu.module.sass'
import  { MdKeyboardArrowDown } from 'react-icons/md'
import Dropdown from "components/dropdown";
export default function Menu() {
    const [isOpen, setIsOpen] = useState(false)

    const handleUser = (event) => {
        if(isOpen) {
            setIsOpen(false)
        } else {
            setIsOpen(true)
        }
    }

    return(
        <div className={classes.avatar_menu}>
            <div className={classes.avatar} onClick={handleUser}>
                <User className={classes.user}/>
                <MdKeyboardArrowDown className={isOpen && classes.rotate} />
            </div>
            <>
                {isOpen && <Dropdown />}
            </>
        </div>
    )
}