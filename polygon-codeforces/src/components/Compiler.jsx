/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { back } from '../../public/template';

const Compiler = ({ message }) => {
    const [code, setCode] = useState('');
    const [ans, setAns] = useState([]);
    const [error, setError] = useState('');
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(code);
        
        try {
            const response = await fetch(`${back}/compile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code: code,
                    id: message.id,
                })
            });
            const data = await response.json();
            setAns(data.answers);
        } catch (err) {
            setError(err.response.data.error);
        }
    };
  
    return (
        <div>
            <h1>Send Code:</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <textarea id="code" rows="10" cols="50" value={code} onChange={(e) => setCode(e.target.value)}></textarea><br />
                    <button type="submit">Submit</button>
                </div>
                <h2> {ans.map((item, index) => {
                        return (
                            <div key={index}>{item}<br /></div>
                        )
                    })} </h2>
            </form>
            <div>
                {/* <pre>{output}</pre> */}
                {error && <pre style={{ color: 'red' }}>{error}</pre>}
            </div>
        </div>
    );
}

export default Compiler