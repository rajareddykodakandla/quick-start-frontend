import { useState } from "react";

export function CreateTodo(props) {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const handleInput = (e) => {
    e.preventDefault();
    console.log(e.target.name, e.target.value);
    const { name, value } = e.target;
    setTodo((preval) => ({ ...preval, [name]: value }));
  };

  const saveTodo = async (e) => {
    e.preventDefault();

    console.log("button clicked", todo);
    const createTodo = await fetch("http://localhost:8080/createTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: todo.title,
        description: todo.description,
      }),
    });

    const createdTodo = await createTodo.json();
    todo._id = createdTodo.todo._id;
    console.log(createdTodo, "created");
    props.setTodos((previousTodos) => [...previousTodos, todo]);

    setTodo(() => ({
      title: "",
      description: "",
      completed: false,
    }));
  };

  return (
    <div>
      <input
        type="text"
        name="title"
        placeholder="Title"
        style={{
          padding: 10,
          margin: 10,
        }}
        onChange={handleInput}
        value={todo.title}
      />
      <br />
      <input
        type="text"
        name="description"
        placeholder="description"
        style={{
          padding: 10,
          margin: 10,
        }}
        onChange={handleInput}
        value={todo.description}
      />
      <br />

      <button
        style={{
          padding: 10,
          margin: 10,
        }}
        onClick={saveTodo}
      >
        Add TODO
      </button>
    </div>
  );
}
