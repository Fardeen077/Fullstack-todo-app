import TodoForm from "../components/TodoForm"
import TodoList from "../components/TodoList"
import useTodoStore from "../store/useTodoStore"
import { useEffect } from "react"

function Home() {
  const { fetchTodos, isLoading} = useTodoStore()

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      <TodoForm />
      <TodoList />
    </div>
  )
}

export default Home