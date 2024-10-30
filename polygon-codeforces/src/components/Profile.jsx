/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import '../styles/profile.css';
import { img_dir } from "../../public/template";

const Profile = ({ message }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editUsername, setEditUsername] = useState(message.username);
    const [editFullname, setEditFullname] = useState(message.fullname);
    const [editEmail, setEditEmail] = useState(message.email);
    const [editAvatar, setEditAvatar] = useState(message.avatarTitle);

    const handleEditClick = () => setIsEditing(true);
    const handleSaveClick = () => setIsEditing(false);

    useEffect(() => {
        setEditUsername(message.username);
        setEditAvatar(message.avatarTitle);
        setEditEmail(message.email);
        setEditFullname(message.fullname);
    }, [editAvatar, editEmail, editFullname, editUsername, message]);

    return (
        <div className="profile-page-container">
            <div className="profile-avatar-container">
                <img src={`${img_dir}${editAvatar}`} alt="Profile Picture" className="profile-avatar" />
            </div>
            <div className="profile-info-container">
                <h2 className="profile-title">Profile</h2>
                <p className="profile-detail profile-name">Name: John Doe</p>
                <p className="profile-detail profile-email">Email: john.doe@example.com</p>
                <p className="profile-detail profile-score">Total Score: 150</p>
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
                    <li className="task-item">
                        <div className="task-details">
                            <p className="task-detail task-name">Task 1</p>
                            <p className="task-detail task-solved">Yes</p>
                            <p className="task-detail task-unsolved">No</p>
                            <p className="task-detail task-status">OK (Test 1)</p>
                        </div>
                    </li>
                    <li className="task-item">
                        <div className="task-details">
                            <p className="task-detail task-name">Task 2</p>
                            <p className="task-detail task-solved">No</p>
                            <p className="task-detail task-unsolved">Yes</p>
                            <p className="task-detail task-status">Wrong Answer (Test 2)</p>
                        </div>
                    </li>
                    <li className="task-item">
                        <div className="task-details">
                            <p className="task-detail task-name">Task 3</p>
                            <p className="task-detail task-solved">Yes</p>
                            <p className="task-detail task-unsolved">No</p>
                            <p className="task-detail task-status">OK (Test 3)</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Profile;