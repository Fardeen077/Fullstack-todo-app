import useTodoStore from '../store/useTodoStore'

function TodoList() {
  const { todos, isLoading } = useTodoStore();
  console.log(todos);
  
  
  if (isLoading) return <p>Loading...</p>
  if (todos.length === 0) return <p>No todos found</p>;
  return (
    <div>
      <div>
        <ul>
          {todos.map((todo) => (
            <li key={todo._id}>{todo.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;