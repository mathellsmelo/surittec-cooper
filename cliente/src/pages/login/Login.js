import React, { useState } from 'react';
import './Login.css';

import api from '../../services/api';
import { login } from "../../services/auth";

export default function Login({ history }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function handleLogin(e) {
        e.preventDefault();

        if (!username || !password) {
            this.setState({ error: "Preencha e-mail e senha para continuar!" });
        } else {
            try {
                const response = await api.post(`/auth/signin`, { username, password });

                login(response.data.accessToken);
                history.push(`/app`);
            } catch (err) {
                setError('Credenciais inválidas')
            }
        }
    }


    return (
        <div className="login-container">
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
                {error && <p>{error}</p>}
                <input
                    placeholder="Digite seu nome de usuário"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    placeholder="Digite sua senha"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
        </div>
    )

}