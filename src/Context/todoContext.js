import React, { createContext, useContext } from "react";
export const todoContext = createContext({
  // todos array 
  todos: [
    {
      id: 1,
      todo: "Todo Message",
      completed: false,
    },
  ],

  //   methods declared on context , will add functionality in app.js
  addTodo: (todo) => {},
  deleteTodo: (id) => {},
  updateTodo: (id, todo) => {},
  completeTodo: (id) => {},
});
export const TodoProvider = todoContext.Provider; //wrapper varibale
export default function useTodo() {
  return useContext(todoContext); //useContext need a context
}
