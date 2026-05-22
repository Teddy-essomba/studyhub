import { useEffect, useState } from 'react';

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

  return (
    <div>
      <h1>StudyHub Tasks</h1>

      <form onSubmit={addTask}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a task"
        />
        <button type="submit">Add</button>
      </form>

      <ul>
      {tasks.map((task) => (
        <li
          key={task.id}
          onClick={() => toggleTask(task)}
          style={{ cursor: 'pointer' }}
        >
          {task.title} {task.completed ? '✅' : '❌'}
        </li>
      ))}
    </ul>
    </div>
  );
}

export default App;
