// src/Kanban.js
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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
        const newTask = { id: uuidv4(), title, description, priority, status: 'A Fazer' };

        setTasks(prevTasks => {
            const updatedTasks = { ...prevTasks };
            updatedTasks.todo.push(newTask);
            return updatedTasks;
        });
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const { source, destination } = result;
        const sourceColumn = source.droppableId;
        const destinationColumn = destination.droppableId;

        const sourceTasks = Array.from(tasks[sourceColumn]);
        const [movedTask] = sourceTasks.splice(source.index, 1);

        const destinationTasks = Array.from(tasks[destinationColumn]);
        destinationTasks.splice(destination.index, 0, movedTask);

        setTasks(prevTasks => ({
            ...prevTasks,
            [sourceColumn]: sourceTasks,
            [destinationColumn]: destinationTasks,
        }));
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="kanban-container">
                <button className="add-task-button" onClick={openModal}>
                    Adicionar Tarefa
                </button>
                {['todo', 'doing', 'done'].map((column, index) => (
                    <Droppable key={index} droppableId={column}>
                        {(provided) => (
                            <div 
                                className="column" 
                                ref={provided.innerRef} 
                                {...provided.droppableProps}
                            >
                                <h2>{column === 'todo' ? 'A Fazer' : column === 'doing' ? 'Fazendo' : 'Concluído'}</h2>
                                <ul>
                                    {tasks[column].map((task, index) => (
                                        <Draggable key={task.id} draggableId={task.id} index={index}>
                                            {(provided) => (
                                                <li 
                                                    className="task" 
                                                    ref={provided.innerRef} 
                                                    {...provided.draggableProps} 
                                                    {...provided.dragHandleProps}
                                                >
                                                    <h4>{task.title}</h4>
                                                    <p>{task.description}</p>
                                                </li>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </ul>
                            </div>
                        )}
                    </Droppable>
                ))}
                <TaskModal 
                    isOpen={isModalOpen} 
                    onRequestClose={() => setIsModalOpen(false)} 
                    onAddTask={addTask} 
                />
            </div>
        </DragDropContext>
    );
};

export default Kanban;