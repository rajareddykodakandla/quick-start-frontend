import { useState, useEffect } from "react";
import { CreateTodo } from "./components/CreateTodo";
import { Todos } from "./components/Todos";

function App() {
  const [todos, setTodos] = useState([
    {
      title: "gym",
      description: "Go to gym",
      completed: true,
    },
  ]);

  useEffect(() => {
    fetch("http://localhost:8080/todos").then(async (res) => {
      const data = await res.json();
      console.log("dbdata", data);
      setTodos(data.todos);
    });
  }, []);

  console.log("todos", todos);

  return (
    <div>
      <CreateTodo setTodos={setTodos}></CreateTodo>
      <Todos todos={todos} setTodos={setTodos}></Todos>
    </div>
  );
}

export default App;
