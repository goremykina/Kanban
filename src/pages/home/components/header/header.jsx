import React from "react";
import classes from './header.module.sass'


export default function Header() {
    return(
        <div className={classes.header_footer_common}>
            <h2 className={classes.header_h}>Awesome Kanban Board</h2>
        </div>
    )
}