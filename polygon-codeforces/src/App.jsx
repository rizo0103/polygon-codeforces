import './App.css'
import AddTask from './components/AddTask';
import Main from './components/Main'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='add-task' element={<AddTask />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
