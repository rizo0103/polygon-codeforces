/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { back } from '../../public/template';
import '../styles/style.css';
import '../styles/task-page.css';
import '../styles/navbar.css';
import Navbar from './Navbar';

const TaskDetail = () => {
    const { id } = useParams();
    const [ code, setCode ] = useState('');
    const [ input, setInput ] = useState([]);
    const [ output, setOutput ] = useState([]);
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
            setInput(data.results[0].inputs);
            setOutput(data.results[0].outputs);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = () => {

    }

    useEffect(() => {
        getTaskDetails();
    }, []);

    if (!task) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />
            <main className="task-page">
                <div className="task-container">
                    <h1 className="task-title">{task.title}</h1>
                    
                    <div className="task-description">
                        <h2>Problem Statement</h2>
                        <p>{task.statement}</p>
                    </div>
                    
                    <div className="example-task-box">
                        <h3>Example</h3>
                        <p><strong>Input:</strong> {JSON.parse(input)[0]}</p>
                        <p><strong>Output:</strong> {JSON.parse(output)[0]}</p>
                    </div>
                    
                    <div className="code-editor">
                        <h3>Your Code</h3>
                        <textarea 
                            value={code} 
                            onChange={(e) => setCode(e.target.value)} 
                            rows="10" 
                            placeholder="Write your solution here..." 
                        />
                    </div>
                    
                    <button className="submit-button" onClick={handleSubmit}>Submit Solution</button>

                    {/* Result Section */}
                    <div className="result-box">
                        <p>OK</p>
                    </div>
                </div>
            </main>

        </div>
    );
};

export default TaskDetail;
