import TodoForm from "../components/TodoForm"
import TodoList from "../components/TodoList"
import useTodoStore from "../store/useTodoStore"
import { useEffect } from "react"

function Home() {
  const { fetchTodos } = useTodoStore()

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);
  return (
    <div className="flex p-10 justify-center bg-gray-100 overflow-y-auto space-y-3">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Todo
        </h1>
        <TodoForm />
        <TodoList />
      </div>
    </div>
  )
}

export default Home