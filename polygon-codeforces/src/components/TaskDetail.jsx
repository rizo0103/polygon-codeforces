/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { back } from '../../public/template';
import '../styles/style.css';
import '../styles/task-page.css';
import '../styles/navbar.css';
import Navbar from './Navbar';

const TaskDetail = ({message}) => {
    const { id } = useParams();
    const [ code, setCode ] = useState('');
    const [ input, setInput ] = useState([]);
    const [ output, setOutput ] = useState([]);
    const [ task, setTask ] = useState(null);
    const [ userData, setUserData ] = useState('');
    const [ verdict, setVerdict ] = useState([]);
    const [ color, setColor ] = useState("#b71c1c");

    useEffect(() => {
        setUserData(message);
        const userTasks = message.tasks ? JSON.parse(message.tasks) : [];
        const filteredVerdict = userTasks.filter(item => item.id === task.id);
    
        setVerdict(filteredVerdict);
    }, [message, userData]);

    const getTaskDetails = async () => {
        try {
            const response = await fetch(`${back}/get-task-details/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (response.ok) {
                const data = await response.json();
    
                await setTask(data.results[0]);
                await setInput(data.results[0].inputs);
                await setOutput(data.results[0].outputs);
                
            }
    
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!code) {
            alert('Write code first');
            return;
        }
    
        try {
            // Compile the code
            const response = await fetch(`${back}/compile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code: code,
                    username: userData.username,
                    id: task.id,
                }),
            });
    
            const output = await response.json();
            setVerdict(output.output);
    
            // Ensure verdict is set before making the next request
            const verdict = output.output;
    
            // Add the solution
            const newResponse = await fetch(`${back}/add-solution`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: task.id,
                    username: userData.username,
                    verdict: verdict,
                }),
            });
    
            if (newResponse.ok) {
                window.location.reload();
            } else {
                console.error('Failed to add solution');
            }
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
        <div>
            <Navbar message={userData} />
            <form className="task-page" onSubmit={handleSubmit}>
                <div className="task-container">
                    <h1 className="task-title">{task.title}</h1>
                    
                    <div className="task-description">
                        <h2>Problem Statement</h2>
                        <pre>{task.statement}</pre>
                    </div>
                    
                    <div className="example-task-box">
                        <h3>Example</h3>
                        <p><strong>Input:</strong> {JSON.parse(input)[0]}</p>
                        <p><strong>Output:</strong> {JSON.parse(output)[0]}</p>
                    </div>
                    
                    <div className="code-editor">
                        <h3>Your Code</h3>
                        <textarea value={code} onChange={(e) => setCode(e.target.value)} rows="10" placeholder="Write your solution here..." />
                    </div>
                    
                    <button className="submit-button">Submit Solution</button>

                    {/* Result Section */}
                    {verdict[0] && (
                        <div className="result-box" style={{ background: verdict[0].verdict === 'All test cases passed' ? "green" : color }}>
                            <p>{verdict[0].verdict}</p>
                        </div>
                    )}
                </div>
            </form>

        </div>
    );
};

export default TaskDetail;
