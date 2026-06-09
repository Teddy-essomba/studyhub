function TaskItem({ task, toggleTask, deleteTask }) {
  return (
    <li>
      <span
        onClick={() => toggleTask(task)}
        style={{
          cursor: 'pointer',
          textDecoration: task.completed ? 'line-through' : 'none',
        }}
      >
        {task.title} {task.completed ? '✅' : '❌'}
      </span>

      <span>
        {task.category} {task.due_date ? `⏰ Due: ${task.due_date}` : ''}
      </span>

      <button onClick={() => deleteTask(task.id)}>
        Delete
      </button>

    </li>
  );
}

export default TaskItem;
