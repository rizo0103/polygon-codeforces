/* eslint-disable react-hooks/exhaustive-deps */
import './App.css'
import AddTask from './components/AddTask';
import Main from './components/Main'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TaskDetail from './components/TaskDetail';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import { useEffect, useState } from 'react';
import { back } from '../public/template';

function App() {
    const token = window.localStorage.getItem('access-token');
    const [ userData, setUserData ] = useState('');

    const getData = async () => {
        if (!token) {
            return ;
        }

        try {
            const userResponse = await fetch(`${back}/get-user-data`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${token}`, // Make sure token is valid
                    'Content-Type': 'application/json',
                },
            });
    
            if (!userResponse.ok) {
                window.localStorage.removeItem('access-token');
                throw new Error('Failed to fetch user data');
            }
    
            const userData = await userResponse.json();
            setUserData(userData.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/add-task' element={<AddTask />} />
                <Route path='/task/:id' element={<TaskDetail />} />
                <Route path='/sign-in' element={<SignIn />} />
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='/profile' element={<Profile message= {userData} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
