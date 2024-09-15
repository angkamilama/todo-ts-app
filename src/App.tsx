import { useState, useReducer } from "react";
import { Input } from "./components/ui/input";
import { v4 as uuidv4 } from "uuid";

const ADD_TODO = "ADD_TODO";

const InitialState = {
  todoList: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO: {
      return {
        ...state,
        todoList: [
          ...state.todoList,
          { todoItem: action.todoItem, id: action.id },
        ], // Correct state update
      };
    }
    default:
      return state;
  }
};

function App() {
  const [todoItem, setTodoItem] = useState("");
  const [todo, dispatch] = useReducer(reducer, InitialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todoItem) return;
    let todoId: string = uuidv4();
    dispatch({ type: ADD_TODO, todoItem: e.target.value, id: todoId });
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Todo:
            <Input
              type="text"
              value={todoItem}
              onChange={(e) => setTodoItem(e.target.value)}
            />
          </label>
          <button className="border border-slate-700 bg-slate-300 p-1 rounded-lg">
            Add
          </button>
        </form>
        <ul>
          {todo.todoList.map((item) => (
            <li key={item.id}>{item.todoItem}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
