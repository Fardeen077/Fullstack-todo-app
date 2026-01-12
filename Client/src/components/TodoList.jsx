import { useState } from 'react';
import useTodoStore from '../store/useTodoStore';
import { MdDelete, MdRadioButtonUnchecked } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaRegCheckCircle } from "react-icons/fa";

function TodoList() {
  const { todos, deleteTodo, updateTodo, isLoading, updateStatus } = useTodoStore();

  const [editTodoId, setEditTodoId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const handleDelTodo = async (id) => {
    try {
      await deleteTodo(id);
    } catch (error) {
      error("todo not delect", error)
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

      setEditTodoId(null);
      setEditTitle("");
    } catch (error) {
      error("Todo not updated", error);
    }
  };

  const handleTodoStateus = async (id) => {
    try {
      await updateStatus(id)
    } catch (error) {
      error("Todo status not updated", error);
    }
  }

  if (todos.length === 0) return <p className='flex justify-center p-10'>No todos found</p>;

  return (
    <div className='w-full gap-5'>
      <ul className="flex flex-col gap-3">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="rounded-lg p-3"
          >
            <div className="flex justify-between items-start gap-3">

              {/* LEFT SIDE */}
              {editTodoId === todo._id ? (
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="flex-1 border px-2 py-1 rounded"
                />
              ) : (
                <div className="flex items-center gap-3 break-words whitespace-pre-wrap ">
                  <p
                    className='cursor-pointer text-xl flex-shrink-0'
                    onClick={() => handleTodoStateus(todo._id)}>{todo.status ? <FaRegCheckCircle /> : <MdRadioButtonUnchecked />}</p>

                  <span className={`transition-all duration-200
                     ${todo.status ? "line-through text-gray-400" : "text-gray-900"}`}>
                    {todo.title}</span>
                </div>
              )}

              {/* RIGHT SIDE ACTIONS */}
              <div className="flex items-center gap-2 shrink-0">
                {editTodoId === todo._id ? (
                  <button
                    onClick={() => handleSave(todo._id)}
                    className="text-sm px-2 py-1 bg-green-500 text-white rounded"
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditClick(todo)}
                      className="p-1 cursor-pointer text-xl"
                    >
                      <CiEdit />
                    </button>

                    <button
                      onClick={() => handleDelTodo(todo._id)}
                      className="p-1 cursor-pointer text-xl"
                    >
                      <MdDelete />
                    </button>
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
