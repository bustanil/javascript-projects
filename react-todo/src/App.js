import { useEffect, useState } from 'react';
import './App.css';

function App() {

  return (
    <div className="App">
      <TodoList />
    </div>
  );
}

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodos([
      {title: "My task", done: false},
      {title: "My task 2", done: true},
      {title: "My task 3", done: true},
    ])
  }, []);

  return (
    <div>
    <ul>
        {todos.map(todo => <TodoItem title={todo.title} done={todo.done} />)}
    </ul>
    </div>
  )
}

function TodoItem({title, done}) {
  return (
    <div>
      { done ?
        <input type="checkbox" checked/> :
        <input type="checkbox"/>
      }
      <li>{title}</li>
      <button>remove</button>
    </div>
  )
}

export default App;
