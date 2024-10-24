/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import './style.css';
import useDynamicHeight from "../../public/useDynamicHeight";
import axios from "axios";
import { back } from "../../public/template";

const AddTask = () => {
    const [task, setTask] = useState({title: '', statement: '', inputs: '', outputs: '', timeLimit: 0});
    const useDynamicHeightRef = useDynamicHeight(task.statement);

    const onSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.post(`${back}/add-task`, {
                title: task.title,
                inputTests: task.inputs, 
                outputTests: task.outputs, 
                timeLimit: task.timeLimit, 
                statement: task.statement,
            });

            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form className="add-task-form" onSubmit={onSubmit}>
            <h1> Add New Task </h1>
            <div style={{ width: '70%', justifyItems: 'center', display: 'flex', gap: '5%' }}>
                <div className="task-container">
                    <label htmlFor="title" className="task-data-label"> Title: </label>
                    <input placeholder="Enter task title" className="task-data" id="title" onChange={(e) => {task.title = e.target.value}} />
                </div>
                <div className="task-container">
                    <label htmlFor="input-test" className="task-data-label"> Input tests: </label>
                    <input id="input-test" className="task-data" placeholder="Enter input tests" onChange={(e) => {task.inputs = e.target.value}} />
                </div>
            </div>
            <div style={{ width: '70%', justifyItems: 'center', display: 'flex', gap: '5%' }}>
                <div className="task-container">
                    <label htmlFor="time-limit" className="task-data-label"> Time Limit: </label>
                    <input placeholder="Enter task time limit (ms)" className="task-data" id="time-limit" onChange={(e) => {task.timeLimit = e.target.value}} />
                </div>
                <div className="task-container">
                    <label htmlFor="output-test" className="task-data-label"> Output tests: </label>
                    <input id="output-test" className="task-data" placeholder="Enter output tests" onChange={(e) => {task.outputs = e.target.value}} />
                </div>
            </div>
            <label> Statement: </label>
            <textarea placeholder="Enter task statement" className="task-statement" ref={useDynamicHeightRef} rows={20} onChange={(e) => {
                task.statement = e.target.value;
                setTask(task);
                }} />
            <div className="submit-part">
                <button type="submit" className="btn-primary"> Submit </button>
            </div>
        </form>
    )
};

export default AddTask;
