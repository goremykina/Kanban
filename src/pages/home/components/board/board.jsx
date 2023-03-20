import React, { useEffect, useState } from "react";
import Column from "./components/column";
import { statuses, getTasks, createTask, moveTask, subscribe } from 'services/tasksService';
import classes from './board.module.sass'

export default function Board() {
    const [statusToTasks, setStatusToTasks] = useState(() => getTasks());

    useEffect(() => {
        const unsubscribeFn = subscribe(newTasks => setStatusToTasks(newTasks));
        return unsubscribeFn;
    }, [])

    const addTask = (title) => {
        const newTask = createTask(title);

        statusToTasks[statuses.backlog].push(newTask);
        setStatusToTasks({ ...statusToTasks });
    }

    return (
        <div className={classes.content}>
            <Column
                title="Backlog"
                tasks={statusToTasks[statuses.backlog]}
                addTask={addTask}
                isAbleToCreate={true}
            />

            <Column
                title="Ready"
                tasks={statusToTasks[statuses.ready]}
                availableTask={statusToTasks[statuses.backlog]}
                moveTask={id => moveTask(id, statuses.backlog, statuses.ready)}
            />

            <Column
                title="In Progress"
                tasks={statusToTasks[statuses.inProgress]}
                availableTask={statusToTasks[statuses.ready]}
                moveTask={id => moveTask(id, statuses.ready, statuses.inProgress)}
            />

            <Column
                title="Finished"
                tasks={statusToTasks[statuses.finished]}
                availableTask={statusToTasks[statuses.inProgress]}
                moveTask={id => moveTask(id, statuses.inProgress, statuses.finished)}
            />
        </div>
    )
}

