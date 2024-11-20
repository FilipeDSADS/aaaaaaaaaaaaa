// src/TaskModal.js
import './TaskModal.css';
import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Para acessibilidade

const TaskModal = ({ isOpen, onRequestClose, onAddTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Baixa');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddTask({ title, description, priority }); // Removido o status
        setTitle('');
        setDescription('');
        setPriority('Baixa');
        onRequestClose();
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onRequest Close={onRequestClose} 
            contentLabel="Adicionar Tarefa"
        >
            <h2>Adicionar Nova Tarefa</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Título:</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Descrição:</label>
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Prioridade:</label>
                    <select 
                        value={priority} 
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="Baixa">Baixa</option>
                        <option value="Média">Média</option>
                        <option value="Alta">Alta</option>
                    </select>
                </div>
                <button type="submit">Adicionar Tarefa</button>
                <button type="button" onClick={onRequestClose}>Cancelar</button>
            </form>
        </Modal>
    );
};

export default TaskModal;