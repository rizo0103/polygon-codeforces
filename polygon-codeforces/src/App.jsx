import './App.css'
import AddTask from './components/AddTask';
import Main from './components/Main'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TaskDetail from './components/TaskDetail';
import SignIn from './components/SignIn';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<Main />} />
        <Route path = '/add-task' element = {<AddTask />} />
        <Route path = '/task/:id' element = {<TaskDetail />} />
        <Route path='/sign-in' element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
