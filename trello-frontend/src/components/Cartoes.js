// src/components/Cartoes.js
/*import React, { useEffect, useState } from 'react';
import { fetchTarefas } from './services/api'; // Verifique se este caminho está correto após a criação do arquivo api.js

const Cartoes = () => {
    const [tarefas, setTarefas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadTarefas = async () => {
            try {
                const data = await fetchTarefas();
                console.log("Dados das tarefas:", data);
                setTarefas(data);
            } catch (err) {
                console.error("Erro ao carregar tarefas:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        loadTarefas();
    }, []);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro ao carregar tarefas: {error.message}</p>;

    return (
        <div>
            <h1>Meus Cartões</h1>
            <ul>
                {tarefas.map(tarefa => (
                    <li key={tarefa.id}>{tarefa.nome}</li>
                ))}
            </ul>
        </div>
    );
};

export default Cartoes;*/

// src/components/Cartoes.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useWebSocket from './useWebSocket'; 
import Kanban from './Kanban'; 

const Cartoes = () => {
    const [cartoes, setCartoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCartoes = async () => {
        try {
            const response = await axios.get('http://localhost:3000/cartoes');
            setCartoes(response.data);
        } catch (err) {
            setError(err);
            console.error('Erro ao buscar cartões:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCartoes();
    }, []);

    const handleNewCartao = (newCartao) => {
        setCartoes((prevCartoes) => [...prevCartoes, newCartao]);
    };

    const handleUpdatedCartao = (updatedCartao) => {
        setCartoes((prevCartoes) => 
            prevCartoes.map(cartao => 
                cartao.id === updatedCartao.id ? updatedCartao : cartao
            )
        );
    };

    const handleRemovedCartao = (removedCartao) => {
        setCartoes((prevCartoes) => 
            prevCartoes.filter(cartao => cartao.id !== removedCartao.id)
        );
    };

    useWebSocket((data) => {
        if (data.event === 'cartaoCreated') {
            handleNewCartao(data.cartao);
        } else if (data.event === 'cartaoUpdated') {
            handleUpdatedCartao(data.cartao);
        } else if (data.event === 'cartaoRemoved') {
            handleRemovedCartao(data.cartao);
        }
    }); 

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro ao carregar cartões: {error.message}</p>;

    return (
        <div>
            <h1>Meus Cartões</h1>
            <ul>
                {cartoes.map((cartao) => (
                    <li key={cartao.id}>Cartão: {cartao.titulo}</li>
                ))}
            </ul>
            <Kanban /> {/* Renderizando o Kanban */}
        </div>
    );
};

export default Cartoes;