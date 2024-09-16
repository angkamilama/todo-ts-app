import { useState, useReducer } from "react";
import { Input } from "./components/ui/input";
import { v4 as uuidv4 } from "uuid";

const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const EDIT_TODO = "EDIT_TODO";

interface Todo {
  todoItem: string;
  id: string;
  type?: string;
}

const initialState: Todo[] = [];

const reducer = (state: Todo[], action: Todo) => {
  switch (action.type) {
    case ADD_TODO: {
      return [...state, { todoItem: action.todoItem, id: action.id }];
    }
    case EDIT_TODO: {
      return state.map((item) =>
        item.id === action.id ? { ...item, todoItem: action.todoItem } : item
      );
    }
    default:
      return state;
  }
};

function App() {
  const [todoItem, setTodoItem] = useState("");
  const [todo, dispatch] = useReducer(reducer, initialState);
  const [editedTodoItem, setEditedTodoItem] = useState("");
  const [editedId, setEditedId] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todoItem) return;
    let todoId: string = uuidv4();
    dispatch({ type: ADD_TODO, todoItem: todoItem, id: todoId });
    setTodoItem("");
  };

  const handleEditedInput = (id: string) => {
    setEditedId(id);
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
          {todo.map((item) => (
            <li key={item.id}>
              {editedId === item.id ? (
                <div>
                  <Input
                    type="text"
                    value={editedTodoItem}
                    onChange={(e) => setEditedTodoItem(e.target.value)}
                  />
                  <button
                    className="border border-slate-700 bg-slate-300 p-1 rounded-lg"
                    onClick={() => {
                      dispatch({
                        type: EDIT_TODO,
                        id: item.id,
                        todoItem: editedTodoItem,
                      });
                      setEditedId(" "); // Reset the editedId after changing the todo
                    }}
                  >
                    Change
                  </button>
                </div>
              ) : (
                <div>
                  {item.todoItem}
                  <button onClick={() => handleEditedInput(item.id)}>
                    Edit
                  </button>
                  <button>Remove</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
