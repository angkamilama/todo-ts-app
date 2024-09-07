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
    <div className=" w-screen h-full border border-red-500">
      <form
        onSubmit={handleSubmit}
        className="flex justify-evenly items-center h-[300px] w-[600px] border border-slate-400"
      >
        <label>
          Todo:
          <input
            value={todoItem}
            onChange={(e) => setTodoItem(e.target.value)}
            className="border-2 border-red-700"
          />
        </label>
        <button type="submit">Add</button>
      </form>
      <div>
        {todoList.map((todo) =>
          todo.todoId === editId ? (
            <div key={todo.todoId}>
              <form onSubmit={handleEditedSubmit}>
                <label>
                  <input
                    type="text"
                    name="editedTodo"
                    defaultValue={todo.todoItem}
                    onChange={(e) => handleEditedInputTodo(e)}
                  />
                </label>
                <button type="submit">Update</button>
                <button onClick={() => setEditId("")}>Cancel</button>
              </form>
              {showEditInputItemMsg && (
                <p className="text-red-600">Please change the TodoItem</p>
              )}
            </div>
          ) : (
            <>
              <div key={todo.todoId}>
                <div>{todo.todoItem}</div>
                <button
                  onClick={() => {
                    setEditId(todo.todoId);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => setRemovalId(todo.todoId)}>
                  Remove
                </button>
              </div>
              {removalId === todo.todoId && (
                <>
                  <h3>Do you want to remove the todoItem ? </h3>
                  <button onClick={() => handleRemoveTodo(todo.todoId)}>
                    Yes
                  </button>
                  <button onClick={() => setRemovalId("")}>No</button>
                </>
              )}
            </>
          )
        )}
      </div>
    </div>
  );
}

export default App;
