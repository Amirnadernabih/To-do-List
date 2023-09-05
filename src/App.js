import { useState } from "react";
import React from 'react';
import './App.css';

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [enterText, setEnterText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState(""); // New state variable for storing the current value of the task being edited

  const handleAddTodo = () => {
    if (enterText.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        task: enterText
      };

      setTodoList(todoList => [...todoList, newTodo]);
      setEnterText("");
    }
  };

  const handleRemoveTodo = (id) => {
    setTodoList(todoList => todoList.filter(todo => todo.id !== id));
  };

  const handleEditTodo = (id, newTask) => {
    setTodoList(todoList =>
      todoList.map(todo => {
        if (todo.id === id) {
          return { ...todo, task: newTask };
        }
        return todo;
      })
    );
    setEditMode(false);
    setEditId(null);
  };

  const handleInputChange = ({ target }) => {
    setEnterText(target.value);
  };

  const handleEditButtonClick = (id) => {
    const taskToEdit = todoList.find(item => item.id === id); // Find the task being edited
    setEditTask(taskToEdit.task); // Set the initial value of the editTask state variable
    setEditMode(true);
    setEditId(id);
  };

  return (
    <main className="main">
      <div className='container'>
        <div>
          <h1>To-Do List</h1>
          <input className='textarea' type="text" value={enterText} onChange={handleInputChange} placeholder="Enter a task" />
          <button onClick={handleAddTodo} className="btn">ADD</button>
        </div>
        <div className="second">
          <ul>
            {todoList.map(item => (
              <li key={item.id}>
                {editMode && editId === item.id ? (
                  <>
                    <input type="text" className='textarea' value={editTask} onChange={(e) => {
                      e.stopPropagation();
                      setEditTask(e.target.value); // Update the value of the editTask state variable
                    }} />
                    <button onClick={() => handleEditTodo(item.id, editTask)} className="btn">SAVE</button>
                  </>
                ) : (
                  <>
                  <div className="editors">
                  <div>
                  <p>{item.task}</p>
                  </div>
                    <div>
                    <button onClick={() => handleRemoveTodo(item.id)} className="btn">REMOVE</button>
                    <button onClick={() => handleEditButtonClick(item.id)} className="btn">EDIT</button>
                    </div>
                  </div>
                  
                    
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default App;