import { useEffect, useState } from 'react';

function App() {

  return (
      <TodoList />
  );

}

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    // set initial to do items
    setTodos([
      {title: "My task", done: false},
      {title: "My task 2", done: true},
      {title: "My task 3", done: true},
    ])
  }, []);

  function removeTodoItem(index) {
    setTodos(todos => todos.filter((_, i) => i !== index));
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

  function titleChanged(e) {
    setTitle(e.target.value);
  }

  function addTodoItem() {
    if(title === "") {
      alert("Title cannot be empty");
      return;
    }

    setTodos(todos => [...todos, {
      title: title,
      done: false,
    }]);

    setTitle("");
  }

  return (
    <div>
        {todos.map((todo, index) => 
          <TodoItem 
            key={index}
            index={index} 
            title={todo.title} 
            done={todo.done} 
            onRemoveClicked={removeTodoItem} 
            onCheckboxClicked={toggleDone} />)}
        <input type="text" value={title} onChange={titleChanged} />
        <button onClick={addTodoItem}>Add</button>
    </div>
  )
}

function TodoItem({title, done, index, onRemoveClicked, onCheckboxClicked}) {
  return (
      <div>
        <input type="checkbox" defaultChecked={done} onClick={() => onCheckboxClicked(index)}/> :
        <span style={{textDecoration: (done ? "line-through" : "none")}}>{title}</span>
        <button onClick={() => onRemoveClicked(index)}>remove</button>
      </div>
  )
}

export default App;
