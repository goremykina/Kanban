import React from "react";
import classes from './dropdown.module.sass'

export default function Dropdown () {
    return (
        <div className={classes.dropdown}>
                <div className={classes.square}></div>
                <div className={classes.dropdown_item}>Profile</div>
                <div className={classes.dropdown_item}>Log out</div>
        </div>
    )
}