import React, { useEffect, useState } from 'react';
import Todo from './Todo';

function TodoList({ setTodos, filteredTodos }) {
    const [todos, setLocalTodos] = useState([]);

    // useEffect ile API'den veri çekme
    useEffect(() => {
        // API'den GET isteği gönderme
        fetch('/api/todolist') // API'niz buradan alınacak
            .then((response) => response.json())  // JSON formatında cevap al
            .then((data) => {
                setLocalTodos(data); // Veriyi local state'e aktar
            })
            .catch((error) => {
                console.error('Error fetching todos:', error);
            });
    }, []); // Komponent yüklendiğinde sadece bir kez çalışır

    return (
        <div className="todo-container">
            <ul className="todo-list">
                {filteredTodos.length > 0 ? (
                    filteredTodos.map((todo) => (
                        <Todo
                            text={todo.text}
                            todo={todo}
                            key={todo.id}
                            todos={todos}
                            setTodos={setTodos}
                        />
                    ))
                ) : (
                    <li>No todos available.</li>
                )}
            </ul>
        </div>
    );
}

export default TodoList;
