import React, { useState, useEffect } from 'react'
import './App.css'
import Form from './component/Form';
import TodoList from './component/Todolist';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import YesterdayTasks from './component/YesterdayTasks'; // Dün Yapılanlar sayfasını import ettik

function App() {

  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  // API'den veri çekme
  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    filterHandler(todos);
  }, [todos, status]);

  // Todo verilerini API'den çekme
  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/todolist'); // API URL'sini doğru olarak girdiğinizden emin olun
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('API Error:', error);
    }
  }

  const filterHandler = (todos) => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }

  return (
    <Router>
      <div className="App">
        <header>
          <h1>MY TODO LIST</h1>
        </header>

        <nav>
          <ul>
            <li><Link to="/">Ana Sayfa</Link></li>
            <li><Link to="/yesterday">Dün Yapılanlar</Link></li>
          </ul>
        </nav>

        {/* Routes kısmı ile farklı sayfalara yönlendirme */}
        <Routes>
          <Route path="/" element={
            <div>
              <Form
                inputText={inputText}
                setInputText={setInputText}
                todos={todos}
                setTodos={setTodos}
                setStatus={setStatus}
              />
              <TodoList
                todos={todos}
                setTodos={setTodos}
                filteredTodos={filteredTodos}
              />
            </div>
          } />

          <Route path="/yesterday" element={<YesterdayTasks todos={todos} />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
