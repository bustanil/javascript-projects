import { createSignal, For } from "solid-js";

function App() {
  return (
    <TodoList />
  );
}

function TodoList() {

  const [todos, setTodos] = createSignal([
    { title: "my task 1", done: true },
    { title: "another task", done: false },
    { title: "other task", done: false },
  ]);

  const [newTodo, setNewTodo] = createSignal("");

  function toggleDone(index) {
    setTodos(todos().map((todo, idx) => {
      if (idx == index) {
        return { ...todo, done: !todo.done };
      } 

      return todo;
    }));
  }

  function handleChange(e) {
    setNewTodo(e.target.value);
  }

  function addTodo() {
    setTodos([
      ...todos(),
      { title: newTodo(), done: false},
    ]);

    setNewTodo("");
  }

  function removeTodo(toBeRemoved) {
    console.log(toBeRemoved);
    setTodos(todos().filter((_, idx) => (idx !== toBeRemoved)));
  }

  return (
    <>
    <For each={todos()}>
      {(todo, index) => <TodoItem index={index} todo={todo} toggleDone={toggleDone} removeTodo={removeTodo} />}
    </For>
    <div>
      <input type="text" value={newTodo()} onChange={e => handleChange(e)} />
        <button onClick={() => addTodo()}>Add</button>
    </div>
    </>
  );
}

function TodoItem({index, todo, toggleDone, removeTodo}) {
  return (
    <div>
      <input type="checkbox" checked={todo.done} onClick={() => toggleDone(index())} />
      <span style={styles.titleStyle(todo.done)}>{todo.title}</span>
      <button onClick={() => removeTodo(index())}>remove</button>
    </div>
  )
}


const styles = {
  titleStyle: (done) => ({ "text-decoration": (done ? "line-through" : "none") })
};

export default App;
