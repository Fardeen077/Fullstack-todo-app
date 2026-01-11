import { useState } from 'react';
import useTodoStore from '../store/useTodoStore';
import toast from 'react-hot-toast';
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

function TodoList() {
  const { todos, deleteTodo, updateTodo, isLoading } = useTodoStore();

  const [editTodoId, setEditTodoId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const handleDelTodo = async (id) => {
    try {
      await deleteTodo(id);
      toast.success("Todo deleted successfully");
    } catch (error) {
      toast.error("Todo not deleted");
    }
  };

  // ✅ ONLY enable edit mode
  const handleEditClick = (todo) => {
    setEditTodoId(todo._id);
    setEditTitle(todo.title);
  };

  // ✅ ONLY update API
  const handleSave = async (id) => {
    try {
      await updateTodo(id, { title: editTitle });
      toast.success("Todo updated successfully");

      setEditTodoId(null);
      setEditTitle("");
    } catch (error) {
      toast.error("Todo not updated");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (todos.length === 0) return <p>No todos found</p>;

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo._id}>
          {editTodoId === todo._id ? (
            <>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="border px-2"
              />
              <button onClick={() => handleSave(todo._id)}>
                Save
              </button>
            </>
          ) : (
            <>
              <span>{todo.title}</span>
              <button
                onClick={() => handleEditClick(todo)}
                className="p-1 cursor-pointer m-10"
              >
                <CiEdit />
              </button>
            </>
          )}

          <button
            className="p-1 cursor-pointer m-10"
            onClick={() => handleDelTodo(todo._id)}
          >
            <MdDelete />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
