import { v4 as uuid4 } from "uuid";

export function Todos({ todos, setTodos }) {
  console.log("main todos", todos);
  const updateTodo = async (id) => {
    console.log("id", id);
    const updatedTodo = await fetch("http://localhost:8080/completed", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id.toString() }),
    });

    const data = await updatedTodo.json();

    if (data.todo.acknowledged) {
      todos = todos.map((todo) => {
        if (todo._id === id) {
          return { ...todo, completed: true };
        } else {
          return todo;
        }
      });
      console.log(todos);
      setTodos(todos);
    }
  };
  return (
    <>
      {todos.map((todo) => {
        return (
          <div key={uuid4()}>
            <h1>{todo.title}</h1>
            <h2>{todo.description}</h2>
            <button
              onClick={() => {
                updateTodo(todo._id);
              }}
            >
              {!todo.completed ? "Mark as Complete" : "Completed"}
            </button>
          </div>
        );
      })}
    </>
  );
}
