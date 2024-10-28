/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { back } from '../../public/template';
import '../styles/style.css';
import Notes from './Notes';
import Navbar from './Navbar';

const Main = () => {
    const token = window.localStorage.getItem('access-token');
    const [ tasks, setTasks ] = useState([]);
    const [ userData, setUserData ] = useState();

    const getTasks = async () => {
        try {
            const response = await fetch(`${back}/get-tasks-list`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch tasks list');
            }
    
            const data = await response.json();
            setTasks(data.results);
    
            const userResponse = await fetch(`${back}/get-user-data`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${token}`, // Make sure token is valid
                    'Content-Type': 'application/json',
                },
            });
    
            if (!userResponse.ok) {
                throw new Error('Failed to fetch user data');
            }
    
            const userData = await userResponse.json();
            setUserData(userData.data);
        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
        getTasks();
    }, []);

    return (
        <main className='main-page'>
            <Navbar message={{ userData }} />
            <h1> Tasks </h1>
            <div className='tasks-container'>
                {tasks && tasks.length > 0 ? tasks.map((element, index) => (
                    <div key={index} onClick={() => {window.location.href = `/task/${element.id}`}}>
                        <Notes message={element} />
                    </div>
                    // <div key={index} className='task-title'>
                    //     <div className='task-id'> {element.id} </div>
                    //     <div className='task-name' onClick={() => window.location.href = `/task/${element.id}`}> {element.title} </div>
                    //     <div className='task-time-limit'> {element.timeLimit} (ms) </div>
                    // </div>
                )) : <p>No tasks available</p>}
            </div>
        </main>
    );
};

export default Main;
