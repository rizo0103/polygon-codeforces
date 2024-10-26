/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import '../styles/notes.css';
import { O, X } from '../../public/template';

const Notes = ({ message }) => {
    return (
        <div className='sticky-note-container'>
            <div className='sticky-note-content'>
                <h2>Task #{message.id}</h2>
                <h3> Title: {message.title} </h3>
                <h3> Time limit (ms): {message.timeLimit} </h3>
                <img className='status' src={X} />
            </div>
        </div>
    );
};

export default Notes;
