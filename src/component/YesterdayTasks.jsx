import React from 'react';

function YesterdayTasks({ todos }) {
    // Dün yapılan görevleri filtreleme
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); // Dün tarihi ayarlıyoruz
    const yesterdayTodos = todos.filter(todo => {
        const todoDate = new Date(todo.timestamp); // timestamp, görev tamamlanma tarihini temsil ediyor
        return todoDate.toDateString() === yesterday.toDateString(); // Dünle eşleşen görevleri filtrele
    });

    return (
        <div>
            <h2>Dün Yapılanlar</h2>
            <ul>
                {yesterdayTodos.length === 0 ? (
                    <li>Bugün yapılmış bir görev yok.</li>
                ) : (
                    yesterdayTodos.map((todo) => (
                        <li key={todo.id}>{todo.text}</li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default YesterdayTasks;
