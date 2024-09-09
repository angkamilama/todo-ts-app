import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface TodoList {
  todoItem: string;
  todoId: string;
}

function App() {
  const [todoItem, setTodoItem] = useState("");
  const [todoList, setTodoList] = useState<TodoList[]>([]);
  const [showEditInputItemMsg, setShowEditInputItemMsg] = useState(false);
  const [removalId, setRemovalId] = useState("");
  const [editId, setEditId] = useState("");
  const [editedInputValue, setEditedInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todoItem) return;
    let todoId: string = uuidv4();

    setTodoList((todoList) => [...todoList, { todoItem, todoId }]);
    setTodoItem("");
  };

  const handleEditedInputTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedInputValue(e.target.value);
    setShowEditInputItemMsg(false);
  };

  const handleRemoveTodo = (id: string) => {
    const updatedTodoList = todoList.filter((todo) => todo.todoId !== id);
    setTodoList(updatedTodoList);
  };

  const handleEditedSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editedInputValue === "") {
      setShowEditInputItemMsg(true);
    } else {
      const editedTodoList = todoList.map((todo) =>
        todo.todoId === editId ? { ...todo, todoItem: editedInputValue } : todo
      );
      setTodoList(editedTodoList);
      setEditId(" ");
      setEditedInputValue("");
    }
  };

  return (
    <div className=" w-screen h-screen flex flex-col justify-evenly items-center border border-red-300">
      <form
        onSubmit={handleSubmit}
        className="flex justify-evenly items-center w-[500px] h-[300px] border border-green-300 "
      >
        <label>
          Todo:
          <input
            value={todoItem}
            onChange={(e) => setTodoItem(e.target.value)}
            className="border border-dotted border-sky-700 rounded-lg ml-2 p-2 outline-none"
          />
        </label>
        <button
          type="submit"
          className="p-2 bg-slate-500 rounded-lg text-slate-100 hover:bg-slate-600"
        >
          Add
        </button>
      </form>
      <div className="flex flex-col justify-evenly items-center">
        {todoList.map((todo) =>
          todo.todoId === editId ? (
            <div key={todo.todoId}>
              <form
                onSubmit={handleEditedSubmit}
                className=" flex justify-evenly items-center w-[500px]"
              >
                <label className="border-2  border-blue-700 w-1/2 p-1 rounded-lg">
                  <input
                    type="text"
                    name="editedTodo"
                    defaultValue={todo.todoItem}
                    onChange={(e) => handleEditedInputTodo(e)}
                    className="text-center outline-none"
                  />
                </label>
                <div className="flex justify-evenly items-center w-1/2 ">
                  <button
                    type="submit"
                    className="bg-green-300 rounded-lg px-2 p-1 hover:bg-green-400"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setEditId("")}
                    className="bg-red-400 rounded-lg px-2 p-1 hover:bg-red-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
              {showEditInputItemMsg && (
                <p className="text-red-600">Please change the TodoItem</p>
              )}
            </div>
          ) : (
            <div>
              <div
                key={todo.todoId}
                className=" flex justify-between items-center w-[500px] mb-4"
              >
                <div className="border border-dashed border-red-300 w-1/2 p-1 text-center rounded-lg">
                  {todo.todoItem}
                </div>
                <div className="flex justify-evenly items-center w-1/2 ">
                  <button
                    onClick={() => {
                      setEditId(todo.todoId);
                    }}
                    className="bg-green-300 rounded-lg px-2 p-1 hover:bg-green-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setRemovalId(todo.todoId)}
                    className="bg-red-400 rounded-lg px-2 p-1 hover:bg-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
              {removalId === todo.todoId && (
                <div className="w-full flex justify-between items-center mt-3 border border-dashed border-slate-400 p-2 rounded-lg mb-2">
                  <h3 className="text-slate-800">
                    Do you want to remove the todoItem ?{" "}
                  </h3>
                  <button
                    onClick={() => handleRemoveTodo(todo.todoId)}
                    className="bg-green-500 rounded-lg px-2 p-1 hover:bg-green-800 hover:text-white"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setRemovalId("")}
                    className="bg-red-400 rounded-lg px-2 p-1 hover:bg-red-700 hover:text-white"
                  >
                    No
                  </button>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;
