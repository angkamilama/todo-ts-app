import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface TodoList {
  todoItem: string;
  todoId: string;
}

function App() {
  const [todoItem, setTodoItem] = useState("");
  const [todoList, setTodoList] = useState<TodoList[]>([]);
  const [showEditedList, setShowEditedList] = useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todoItem) return;
    let todoId = uuidv4();

    setTodoList((todoList) => [...todoList, { todoItem, todoId }]);

    setTodoItem("");
  };

  const editInputItem = (id: string) => {
    const newTodoList = todoList.filter((element) => element.todoId !== id);

    setTodoList([...newTodoList, { todoItem, todoId: id }]);

    // setTodoList([newTodoList]);
  };
  console.log(todoList);
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
        {todoList.length > 0 && (
          <div>
            {todoList.map((todo) => {
              return (
                <div
                  key={todo.todoId}
                  className="flex justify-evenly items-evenly w-9/12  mb-4"
                >
                  <div>{todo.todoItem}</div>
                  <button
                    className="border-2 border-slate-500 p-1"
                    onClick={() => {
                      editInputItem(todo.todoId);
                      setTodoItem("");
                    }}
                  >
                    edit
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
