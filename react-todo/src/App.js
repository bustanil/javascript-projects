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
    console.log('useeffect called');
    setTodos([
      {title: "My task", done: false},
      {title: "My task 2", done: true},
      {title: "My task 3", done: true},
    ])
  }, []);

  function removeTodoItem(index) {
    setTodos(todos => todos.filter((todo, i) => i !== index));
  }

  function toggleDone(index){
    setTodos(todos => todos.map((todo, i) => {
        if(i === index) {
          return {...todo, done: !todo.done}
        }
        else {
          return todo;
        }
      })
    );
  }

  return (
    <div>
    <ul>
        {todos.map((todo, index) => 
          <TodoItem 
            key={index}
            index={index} 
            title={todo.title} 
            done={todo.done} 
            onRemoveClicked={removeTodoItem} 
            onCheckboxClicked={toggleDone} />)}
    </ul>
    </div>
  )
}

function TodoItem({title, done, index, onRemoveClicked, onCheckboxClicked}) {
  return (
    <li><div>
      <input type="checkbox" defaultChecked={done} onClick={() => onCheckboxClicked(index)}/> :
      {title}
      <span>{done + ""}</span>
      <button onClick={() => onRemoveClicked(index)}>remove</button>
    </div></li>
  )
}

export default App;
