/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import '../styles/notes.css';
import { O, X } from '../../public/template';

const Notes = ({ message, data }) => {

    return (
        <div className='sticky-note-container'>
            <div className='sticky-note-content'>
                <h2>Task #{message.id}</h2>
                <h3> Title: {message.title} </h3>
                <h3> Time limit (ms): {message.timeLimit} </h3>
                {data && data.tasks && (
                    JSON.parse(data.tasks).findIndex(item => item.id === message.id) !== -1 && (
                        JSON.parse(data.tasks)[JSON.parse(data.tasks).findIndex(item => item.id === message.id)].verdict === 'All test cases passed' ? (
                            <img className='status' src={O} />
                        ) : (
                            <img className='status' src={X} />
                        )
                    )
                )}
            </div>
        </div>
    );
};

export default Notes;
