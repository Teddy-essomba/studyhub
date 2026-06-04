import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  async function fetchTasks() {
    const response = await fetch('http://127.0.0.1:8000/api/tasks/');
    const data = await response.json();
    setTasks(data);
  }

  useEffect(() => {
    fetchTasks();
  }, []);


  async function addTask(e) {
    e.preventDefault();

    const response = await fetch('http://127.0.0.1:8000/api/tasks/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        completed: false,
      }),
    });

    const newTask = await response.json();
    setTasks([...tasks, newTask]);
    setTitle('');
  }

  async function toggleTask(task) {
  const response = await fetch(`http://127.0.0.1:8000/api/tasks/${task.id}/`, {

    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      completed: !task.completed,
    }),

  });

  const updatedTask = await response.json();
  setTasks(tasks.map((t) => {
    if (t.id === updatedTask.id) {
      return updatedTask;
    }
    return t;
  }));

}

async function deleteTask(id) {
  const response = await fetch(`http://127.0.0.1:8000/api/tasks/${id}/`, {
    method: 'DELETE',
  });

  if (response.ok) {
    setTasks(tasks.filter((task) => task.id !== id));
  }
}

  return (
  <div className="app">
    <h1>StudyHub Tasks</h1>
    {/* 1. Input area */}
    <TaskForm title={title} setTitle={setTitle} addTask={addTask} />

    {/* 2. List container */}
    <TaskList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />


  </div>
);
}

export default App;




