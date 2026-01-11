import TodoForm from "../components/TodoForm"
import TodoList from "../components/TodoList"
import useTodoStore from "../store/useTodoStore"
import { useEffect } from "react"

function Home() {
  const { fetchTodos, isLoading } = useTodoStore()

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 max-h-64 overflow-y-auto">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Todo
        </h1>
       <div className="">
         <TodoForm />
       </div>


        <div className="">
          <TodoList />
        </div>
      </div>
    </div>
  )
}

export default Home