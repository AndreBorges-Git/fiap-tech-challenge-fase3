import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 400px;
  margin: 5rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

const Title = styled.h1`
  color: #2c3e50;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Button = styled.button`
  padding: 0.75rem;
  background-color: #2c3e50;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #34495e;
  }
`;

const ErrorMsg = styled.p`
  color: #e74c3c;
  text-align: center;
`;

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ usuario: '', senha: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (form.usuario === 'admin' && form.senha === 'fiap2024') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      setError('Usuário ou senha incorretos.');
    }
  };

  return (
    <Container>
      <Title>🔐 Login Admin</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          name="usuario"
          placeholder="Usuário"
          value={form.usuario}
          onChange={handleChange}
          required
        />
        <Input
          name="senha"
          type="password"
          placeholder="Senha"
          value={form.senha}
          onChange={handleChange}
          required
        />
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <Button type="submit">Entrar</Button>
      </Form>
    </Container>
  );
}

export default Login;