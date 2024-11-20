// src/Kanban.js
import React, { useState } from 'react';
import './Kanban.css';
import TaskModal from './TaskModal';

const Kanban = () => {
    const [tasks, setTasks] = useState({
        todo: [],
        doing: [],
        done: []
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const addTask = (taskData) => {
        const { title, description, priority } = taskData;
        const newTask = { id: Date.now(), title, description, priority, status: 'A Fazer' };

        setTasks(prevTasks => {
            const updatedTasks = { ...prevTasks };
            updatedTasks.todo.push(newTask);
            return updatedTasks;
        });
    };

    const moveTask = (taskId, fromColumn, toColumn) => {
        setTasks(prevTasks => {
            const updatedTasks = { ...prevTasks };
            const taskIndex = updatedTasks[fromColumn].findIndex(task => task.id === taskId);
            
            if (taskIndex === -1) {
                console.error(`Task with ID ${taskId} not found in ${fromColumn}`);
                return prevTasks;
            }

            const [task] = updatedTasks[fromColumn].splice(taskIndex, 1);
            updatedTasks[toColumn].push(task);
            return updatedTasks;
        });
    };

    const deleteTask = (taskId, column) => {
        setTasks(prevTasks => {
            const updatedTasks = { ...prevTasks };
            updatedTasks[column] = updatedTasks[column].filter(task => task.id !== taskId);
            return updatedTasks;
        });
    };

    return (
        <div>
            <button onClick={() => setIsModalOpen(true)}>Adicionar Tarefa</button>
            <TaskModal 
                isOpen={isModalOpen} 
                onRequestClose={() => setIsModalOpen(false)} 
                onAddTask={addTask} 
            />
            <div className="kanban-container">
                {['todo', 'doing', 'done'].map((column) => (
                    <div key={column} className="column">
                        <h2>{column === 'todo' ? 'A Fazer' : column === 'doing' ? 'Fazendo' : 'Concluído'}</h2>
                        <ul>
                            {tasks[column].map((task) => (
                                <li key={task.id} className="task">
                                    <div className={`priority-indicator priority-${task.priority.toLowerCase()}`}></div>
                                    <h4>{task.title}</h4>
                                    <p>{task.description}</p>
                                    <p><strong>Prioridade:</strong> {task.priority}</p>
                                    {column === 'todo' && (
                                        <button onClick={() => moveTask(task.id, 'todo', 'doing')}>Mover para Fazendo</button>
                                    )}
                                    {column === 'doing' && (
                                        <button onClick={() => moveTask(task.id, 'doing', 'done')}>Mover para Concluído</button>
                                    )}
                                    <button onClick={() => deleteTask(task.id, column)}>Excluir</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Kanban;