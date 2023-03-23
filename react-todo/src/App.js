import { useState } from 'react';

function App() {

  return (
      <TodoList />
  );

}

function TodoList() {
  const [todos, setTodos] = useState([
      {title: "My task", done: false},
      {title: "My task 2", done: true},
      {title: "My task 3", done: true},
  ]);
  const [title, setTitle] = useState("");

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
    <div style={styles.todoListContainer}>
        {todos.map((todo, index) => 
          <TodoItem 
            key={index}
            index={index} 
            title={todo.title} 
            done={todo.done} 
            onRemoveClicked={removeTodoItem} 
            onCheckboxClicked={toggleDone} />)}
      <div style={styles.addItemContainer}>
        <input type="text" style={styles.newTodoInput} value={title} onChange={titleChanged} />
        <button style={styles.button} onClick={addTodoItem}>Add</button>
      </div>
    </div>
  );
}

function TodoItem({title, done, index, onRemoveClicked, onCheckboxClicked}) {
  return (
      <div style={styles.todoItemContainer}>
        <div>
          <input type="checkbox" defaultChecked={done} onClick={() => onCheckboxClicked(index)}/>
          <span style={styles.todoItemDone(done)}>{title}</span>
        </div>
        <button style={styles.button} onClick={() => onRemoveClicked(index)}>x</button>
      </div>
  );
}

const styles = {
  newTodoInput:{
    width: "80%"
  },
  
  button: {
    marginLeft: "4px", 
    marginRight: "4px"
  },
  
  todoListContainer: {
    display: "flex", 
    flexDirection: "column",
    width: "400px",
  },

  addItemContainer: {
    display: "flex", 
    justifyContent: "center", 
    width: "100%"
  },

  todoItemContainer: {
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginTop: "8px", 
    marginBottom: "8px", 
    width: "100%",
  },

  todoItemDone: (done) => ({
    textDecoration: (done? "line-through" : "none")
  }),

  removeButton: {
    marginLeft: "4px",
    marginRight: "4px",
  }
}

export default App;
