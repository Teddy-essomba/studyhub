function TaskForm({ title, setTitle, addTask, category, setCategory }) {
  return (
    <form onSubmit={addTask}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a task"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="General">General 📁</option>
        <option value="School">School 📚</option>
        <option value="Work">Work 💼</option>
        <option value="Personal">Personal 🏠</option>
      </select>

      <button type="submit">
        Add
      </button>


    </form>
  );
}

export default TaskForm;