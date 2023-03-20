import React, { useEffect, useState } from "react";
import { statuses, getTasks, subscribe } from 'services/tasksService';
import classes from'./footer.module.sass'
import headerClass  from'../header/header.module.sass'

export default function Footer() {
    const [tasks, setTasks] = useState(() => getTasks());

    useEffect(() => {
        const unsubscribeFn = subscribe(newTasks => {
            setTasks(newTasks);
        });

        return unsubscribeFn;
    }, []);

    const activeTasks = tasks[statuses.backlog].length;
    const finishedTasks = tasks[statuses.finished].length;

    return(
        <div className={`${headerClass.header_footer_common} ${classes.footer}`}>
            <div className={classes.footer_task}>
                <h2>{`Active tasks: ${activeTasks}`}</h2>
                <h2>{`Finished tasks: ${finishedTasks}`}</h2>
            </div>
            <div>
                <h2>Kanban board by Alina Goremykina 2022</h2>
            </div>
        </div>
    )
}