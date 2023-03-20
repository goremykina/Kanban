import React, { useCallback, useEffect, useState } from "react";
import debounce from 'lodash.debounce'
import { useLocation } from 'react-router-dom';
import { RxCross1 } from 'react-icons/rx';
import { useNavigate } from "react-router-dom";
import { findTask, updateTask, subscribe } from "services/tasksService";
import Button from "../../components/button";
import Textarea from "../../components/textarea/textarea";
import classes from './details.module.sass'

export default function TaskDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const matches = location.pathname.match(/\/tasks\/(\w+)\/?/)
    const id = matches[1];
    const [task, setTask] = useState(() => findTask(id));
    const debouncedUpdate = useCallback(
        debounce((task) => {
            updateTask(task)
        },300), [],
    );

    useEffect(() => {
        const unsubscribeFn = subscribe(() => {
            setTask(findTask(id));
        });

        return unsubscribeFn;
    }, [])

    useEffect(() => {
        setTask(findTask(id));
    }, [id])

    const handleTask = () => {
        if (!id) {
            return;
        }

        if (task) {
            return <h2 className={classes.task_title}>{task.title}</h2>
        } else {
            return <h2 className={classes.task_title}>Task is not found</h2>
        }
    }

    const handleDetailsClosed = () => {
        navigate('/')
    }

    const handleDescriptionChange = (newDescription) => {
        const newTask = {
            ...task,
            description: newDescription
        };
        setTask(newTask);
        debouncedUpdate(newTask);
    }

    return(
        <div className={classes.details_container}>
            <div className={classes.details_task}>
                <div className={classes.details_up}>
                    {handleTask()}
                    <Button
                        btnClass={classes.btn_close}
                        icon={RxCross1}
                        onClick={handleDetailsClosed}
                    />
                </div>
                {task && <Textarea
                    placeholder={'This task has no description'}
                    className={classes.details_description}
                    onChange={handleDescriptionChange}
                    value={task.description}
                />}
            </div>
        </div>
    )
}