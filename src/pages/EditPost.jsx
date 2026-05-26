import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  background-color: #3498db;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }

  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

const ErrorMsg = styled.p`
  color: #e74c3c;
`;

const Message = styled.p`
  color: #7f8c8d;
  text-align: center;
  margin-top: 3rem;
`;

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ titulo: '', autor: '', conteudo: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/posts/${id}`)
      .then(res => {
        const { titulo, autor, conteudo } = res.data;
        setForm({ titulo, autor, conteudo });
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await api.put(`/posts/${id}`, form);
      navigate('/');
    } catch (err) {
      setError('Erro ao salvar. Verifique se a API está rodando.');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Container><Message>Carregando post...</Message></Container>;

  return (
    <Container>
      <Title>Editar Post</Title>
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
        <Button type="submit" disabled={saving}>
          {saving ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </Form>
    </Container>
  );
}

export default EditPost;