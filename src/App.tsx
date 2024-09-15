import { useState, useReducer } from "react";
import { Input } from "./components/ui/input";
import { v4 as uuidv4 } from "uuid";

const ADD_TODO = "ADD_TODO";

interface Todo {
  todoItem: string;
  id: string;
  type?: string;
}

const initialState: Todo[] = [];

const reducer = (state: Todo[], action: Todo) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, { todoItem: action.todoItem, id: action.id }];
    default:
      return state;
  }
};

function App() {
  const [todoItem, setTodoItem] = useState("");
  const [todo, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todoItem) return;
    let todoId: string = uuidv4();
    dispatch({ type: ADD_TODO, todoItem: todoItem, id: todoId });
    setTodoItem("");
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
          {todo.map((item) => {
            return (
              <div>
                <li key={item.id}>{item.todoItem}</li>
                <button>Edit</button>
                <button>Remove</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
