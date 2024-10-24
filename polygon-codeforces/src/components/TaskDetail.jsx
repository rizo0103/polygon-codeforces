/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { back } from '../../public/template';
import './style.css';
import Compiler from './Compiler';

const TaskDetail = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);

    const getTaskDetails = async () => {
        try {
            const response = await fetch(`${back}/get-task-details/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setTask(data.results[0]);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getTaskDetails();
    }, []);

    if (!task) {
        return <div>Loading...</div>;
    }

    return (
        <main className='task-detail-page'>
            <div>
                <h1>{task.title}</h1>
                <p>Time Limit: {task.timeLimit} ms</p>
            </div>
            <div>
                <p>Description: {task.statement}</p>
            </div>
            <div>
                <Compiler message={{ id: task.id }} />
            </div>
        </main>
    );
};

export default TaskDetail;
