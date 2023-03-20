import React, {useState} from "react";
import { AiOutlinePlus } from 'react-icons/ai';
import Button from "components/button";
import Select from "components/select";
import Textarea from "components/textarea";
import { useNavigate } from "react-router-dom";
import classes from './column.module.sass'

export default function Column({ title, tasks, addTask: addTaskCallback, isAbleToCreate, availableTask, moveTask: moveTaskCallback}) {
    const [isAddMode, setIsAddMode] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [selectedTaskId, setSelectedTaskId] = useState('')
    const navigate = useNavigate();

    const onHandleChanged = (value) => {
        setNewTaskTitle(value)
    }

    const handleId = (selectedTaskId) => {
        setSelectedTaskId(selectedTaskId)
    }

    const handleDetails = (id) => {
        navigate(`/tasks/${id}`)
    }
    const handleTask = () => {
        return (
            tasks.map((task)=> (
                    <div key={task.id} className={classes.task_title}>
                        <div onClick={() => handleDetails(task.id)} className={classes.title_task_inner}>
                            {task.title}
                        </div>
                    </div>
            ))
        )
    }
    const addTask = () => {
        if (newTaskTitle) {
            addTaskCallback(newTaskTitle)
        }

        setIsAddMode(false)
    }

    const moveTask = () => {
        if (selectedTaskId) {
            moveTaskCallback(selectedTaskId);
        }

        setIsAddMode(false)
        setSelectedTaskId('')
    }
     const handleButton = () => {
        if (isAddMode) {
            return (
                <Button
                    buttonName='Submit'
                    btnClass='btn-primary'
                    onClick={isAbleToCreate ? addTask : moveTask}
                />
            )
        }

         return (
             <Button
                 buttonName='Add card'
                 btnClass='secondary'
                 icon={AiOutlinePlus}
                 onClick={() => setIsAddMode(true)}
                 disabled={availableTask && availableTask.length === 0}
             />
         )
    };

    return (
        <div className={classes.column}>
            <h2 className={classes.column_title}>{title}</h2>
            {handleTask()}
            {isAddMode && isAbleToCreate && <Textarea onPressEnter={addTask} onPressEsc={() => setIsAddMode(false)} onChange={onHandleChanged}/>}
            {isAddMode && !isAbleToCreate && <Select
                options={availableTask}
                valueSelector={task => task.id}
                labelSelector={task => task.title} o
                onChange={handleId}/>}
            {handleButton()}
        </div>
    )
}