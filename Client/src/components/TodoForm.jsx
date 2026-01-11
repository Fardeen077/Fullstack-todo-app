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
    <div className=''>
      <form onSubmit={handleTodoForm} className='flex gap-2'>
        <input type="text"
        maxLength={200}
          placeholder='Enter your Todo'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="h-10 px-3 text-sm w-full rounded bg-gray-100"
          />
        <button
         disabled={isLoading}
         className='bg-blue-400 rounded h-11 px-6 hover:bg-blue-500 cursor-pointer'>
          {isLoading ? "Adding..." : "Add"}
        </button>   
      </form>
    </div>
  )
}

export default TodoForm