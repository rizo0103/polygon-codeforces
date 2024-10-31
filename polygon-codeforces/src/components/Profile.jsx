/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import '../styles/profile.css';
import { img_dir } from "../../public/template";
import Navbar from "./Navbar";

const Profile = ({ message }) => {
    const [ userData, setUserData ] = useState('');
    const [ tasks, setTasks ] = useState('');

    useEffect(() => {
        setUserData(message);
        setTasks(message.tasks);
    }, [message, tasks]);

    return (
        <div>
            <Navbar message={userData} />
            <div className="profile-page-container">
                <div className="profile-avatar-container">
                    <img src={`${img_dir}${userData.avatarTitle}`} alt="Profile Picture" className="profile-avatar" />
                </div>
                <div className="profile-info-container">
                    <h2 className="profile-title">Profile</h2>
                    <p className="profile-detail profile-name">Name: {message.fullname}</p>
                    <p className="profile-detail profile-email">Email: {message.email}</p>
                    <p className="profile-detail profile-score">Total Score: {message.score}</p>
                </div>
                <div className="tasks-container1">
                    <h2 className="tasks-title">Tasks</h2>
                    <div className="tasks-header">
                        <h3 className="task-header task-title1">Task Name</h3>
                        <h3 className="task-header task-solved">Solved</h3>
                        <h3 className="task-header task-unsolved">Unsolved</h3>
                        <h3 className="task-header task-status">Status</h3>
                    </div>
                    <ul className="tasks-list">
                        {tasks && JSON.parse(tasks).map((item, index) => {
                            
                            return(
                                <li className="task-item" key={index}>
                                    <div className="task-details">
                                        <p className="task-detail task-name">Task {item.id}</p>
                                        <p className="task-detail task-solved">{item.verdict === "All test cases passed" ? "Yes" : "No"}</p>
                                        <p className="task-detail task-unsolved">{item.verdict === "All test cases passed" ? "No" : "Yes"}</p>                                            
                                        <p className="task-detail task-status">{item.verdict === "All test cases passed" ? "OK" : "Wrong Answer"}</p>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Profile;
