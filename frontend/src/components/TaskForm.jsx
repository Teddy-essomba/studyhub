function TaskForm({ title, setTitle, addTask }) {
  return (
    <form onSubmit={addTask}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a task"
      />

      <button type="submit">
        Add
      </button>
    </form>
  );
}

export default TaskForm;