import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

return (
  <div>
    <h1>StudyHub Tasks</h1>

    <TaskForm
      title={title}
      setTitle={setTitle}
      addTask={addTask}
    />

    <TaskList
      tasks={tasks}
      toggleTask={toggleTask}
      deleteTask={deleteTask}
    />
  </div>
);