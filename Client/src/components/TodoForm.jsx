import React, { useState } from 'react'
import useTodoStore from "../store/useTodoStore"
import toast from "react-hot-toast";

function TodoForm() {
  const { isLoading, addTodo } = useTodoStore();
  const [title, setTitle] = useState("");

  const handleTodoForm = async function (e) {
    e.preventDefault();
    try {
      if (!title.trim()) return
      await addTodo({ title });
      setTitle("");
    } catch (error) {
      error(error?.response?.message?.error || "todo is not create")
    }
  }
  return (
    <div>
      <form onSubmit={handleTodoForm}>
        <input type="text" placeholder='Enter your Todo'
          value={title}
          onChange={(e) => setTitle(e.target.value)} />
        <button disabled={isLoading}>
          {isLoading ? "Adding..." : "Add todo"}
        </button>
      </form>
    </div>
  )
}

export default TodoForm