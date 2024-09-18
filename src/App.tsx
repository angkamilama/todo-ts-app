import { useState, useReducer } from "react";
import { Input } from "./components/ui/input";
import { v4 as uuidv4 } from "uuid";

enum ActionTypes {
  ADD_TODO = "ADD_TODO",
  REMOVE_TODO = "REMOVE_TODO",
  EDIT_TODO = "EDIT_TODO",
}

interface Todo {
  todoItem: string;
  id: string;
  type?: string;
}

const reducer = (state: Todo[], action: Todo) => {
  switch (action.type) {
    case ActionTypes.ADD_TODO: {
      return [...state, { todoItem: action.todoItem, id: action.id }];
    }
    case ActionTypes.EDIT_TODO: {
      return state.map((item) =>
        item.id === action.id
          ? {
              ...item,
              //added this conditional statement
              todoItem: action.todoItem ? action.todoItem : item.todoItem,
            }
          : item
      );
    }
    case ActionTypes.REMOVE_TODO: {
      return state.filter((item) => item.id !== action.id);
    }
    default:
      return state;
  }
};

const initialState: Todo[] = [];

function App() {
  const [todoItem, setTodoItem] = useState("");
  const [editedTodoItem, setEditedTodoItem] = useState("");
  const [editedId, setEditedId] = useState("");
  const [todo, dispatch] = useReducer(reducer, initialState);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todoItem) return;
    let todoId: string = uuidv4();
    dispatch({ type: ActionTypes.ADD_TODO, todoItem: todoItem, id: todoId });
    setTodoItem("");
  };

  //sorted the list as per alphabetical order.
  const sortedTodo = [...todo].sort((a, b) => {
    const nameA = a.todoItem.toLowerCase();
    const nameB = b.todoItem.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center box-border">
        <form
          onSubmit={handleSubmit}
          className=" p-3 h-[130px] flex flex-col justify-evenly items-center  md:flex-row  md:justify-between items-center w-2/3 md:w-1/3  mb-5"
        >
          <label className="flex justify-evenly items-center w-full ">
            TODO
            <Input
              type="text"
              value={todoItem}
              onChange={(e) => setTodoItem(e.target.value)}
              className="ml-5 w-[200px] md:w-[300px]"
            />
          </label>
          <button className="border border-slate-700 bg-slate-300 px-3 py-1 rounded-lg ml-2">
            Add
          </button>
        </form>
        <ul className=" w-5/12 h-40">
          {sortedTodo.map((item) => (
            <li key={item.id} className="h-12 flex items-center">
              {editedId === item.id ? (
                <div className="flex justify-evenly items-center w-10/12 mx-auto mb-2">
                  <Input
                    type="text"
                    value={editedTodoItem}
                    onChange={(e) => setEditedTodoItem(e.target.value)}
                    className="w-9/12"
                  />
                  <button
                    className="border border-slate-700 bg-slate-300 px-1 rounded-lg"
                    onClick={() => {
                      dispatch({
                        type: ActionTypes.EDIT_TODO,
                        id: item.id,
                        todoItem: editedTodoItem,
                      });
                      setEditedId(" ");
                    }}
                  >
                    Update
                  </button>
                </div>
              ) : (
                <div className=" w-10/12 p-1 flex justify-evenly items-center mx-auto">
                  <p className="w-6/12 p-1 text-center">{item.todoItem}</p>
                  <div className="flex justify-evenly items-center w-4/12 ">
                    <button
                      onClick={() => {
                        setEditedId(item.id);
                        setEditedTodoItem(item.todoItem); // added this here
                      }}
                      className="border border-slate-700 bg-slate-300 px-3  rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        dispatch({
                          type: ActionTypes.REMOVE_TODO,
                          id: item.id,
                          todoItem: item.todoItem,
                        })
                      }
                      className="border border-slate-700 bg-slate-300 px-1 rounded-lg ml-5"
                    >
                      Remove
                    </button>
                  </div>
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
