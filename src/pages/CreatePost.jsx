import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../services/api';

const Container = styled.div`
  max-width: 700px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Title = styled.h1`
  color: #2c3e50;
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

const Textarea = styled.textarea`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  min-height: 200px;
  resize: vertical;
`;

const Button = styled.button`
  padding: 0.75rem;
  background-color: #2ecc71;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #27ae60;
  }

  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

const ErrorMsg = styled.p`
  color: #e74c3c;
`;

function CreatePost() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ titulo: '', autor: '', conteudo: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/posts', form);
      navigate('/');
    } catch (err) {
      setError('Erro ao criar post. Verifique se a API está rodando.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Criar Novo Post</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          name="titulo"
          placeholder="Título"
          value={form.titulo}
          onChange={handleChange}
          required
        />
        <Input
          name="autor"
          placeholder="Autor"
          value={form.autor}
          onChange={handleChange}
          required
        />
        <Textarea
          name="conteudo"
          placeholder="Conteúdo do post..."
          value={form.conteudo}
          onChange={handleChange}
          required
        />
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <Button type="submit" disabled={loading}>
          {loading ? 'Publicando...' : 'Publicar Post'}
        </Button>
      </Form>
    </Container>
  );
}

export default CreatePost;