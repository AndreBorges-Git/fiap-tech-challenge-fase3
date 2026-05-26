import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import api from '../services/api';

const Container = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 1.5rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: #2c3e50;
  color: #fff;
  padding: 0.75rem 1rem;
  text-align: left;
`;

const Td = styled.td`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e0e0e0;
  color: #333;
`;

const EditBtn = styled(Link)`
  background-color: #3498db;
  color: #fff;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.85rem;
  margin-right: 0.5rem;

  &:hover {
    background-color: #2980b9;
  }
`;

const DeleteBtn = styled.button`
  background-color: #e74c3c;
  color: #fff;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  border: none;
  font-size: 0.85rem;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }
`;

const Message = styled.p`
  color: #7f8c8d;
  text-align: center;
  margin-top: 3rem;
`;

function Admin() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = () => {
    api.get('/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este post?')) return;
    try {
      await api.delete(`/posts/${id}`);
      fetchPosts();
    } catch (err) {
      alert('Erro ao excluir post.');
      console.error(err);
    }
  };

  return (
    <Container>
      <Title>Painel Admin</Title>
      {loading && <Message>Carregando...</Message>}
      {!loading && posts.length === 0 && <Message>Nenhum post encontrado.</Message>}
      {!loading && posts.length > 0 && (
        <Table>
          <thead>
            <tr>
              <Th>Título</Th>
              <Th>Autor</Th>
              <Th>Ações</Th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post._id}>
                <Td>{post.titulo}</Td>
                <Td>{post.autor}</Td>
                <Td>
                  <EditBtn to={`/editar/${post._id}`}>Editar</EditBtn>
                  <DeleteBtn onClick={() => handleDelete(post._id)}>Excluir</DeleteBtn>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default Admin;