/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { back } from '../../public/template';
import './style.css';

const Main = () => {
    const [tasks, setTasks] = useState([]);

    const getData = async () => {
        try {
            const response = await fetch(`${back}/get-tasks-list`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();

            setTasks(data.results);
        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
        getData();
    }, []);

    return (
        <main className='main-page'>
            <h1> Tasks </h1>
            <div className='tasks-container'>
                {tasks && tasks.length > 0 ? tasks.map((element, index) => (
                    <div key={index} className='task-title'>
                        <div className='task-id'> {element.id} </div>
                        <div className='task-name' onClick={() => window.location.href = `/task/${element.id}`}> {element.title} </div>
                        <div className='task-time-limit'> {element.timeLimit} (ms) </div>
                    </div>
                )) : <p>No tasks available</p>}
            </div>
        </main>
    );
};

export default Main;
