import { useEffect, useState } from "react";
import "./App.css";
import TodoItem from "./Components/TodoItem";
import { TodoProvider } from "./Context/index";
import TodoForm from "./Components/TodoForm";
function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prevTodo) => [{ id: Date.now(), ...todo }, ...prevTodo]); //spreding privious stae of todo so the previous adate in not lost
  };
  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );

  };

  const deleteTodo = (id) => {
    setTodos((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
  };

  const completeTodo = (id) => {
    setTodos((prev) =>
      prev.map((val) =>
        val.id === id ? { ...val, completed: !val.completed } : val
      )
    );
  };

  useEffect(() => {
    //getting the todos object
    const todos = JSON.parse(localStorage.getItem("todos"));
    //if there is any todo in local storage then update the setTodos
    if (todos && todos.length) {
      setTodos(todos);
    }
  }, []);
  //setting new todos to local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    // eslint-disable-next-line no-undef
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, completeTodo }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => {
              return (
                <div key={todo.id} className="w-full">
                  <TodoItem todo={todo} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
