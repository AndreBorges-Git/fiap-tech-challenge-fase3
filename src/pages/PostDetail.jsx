import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import api from '../services/api';

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const BackLink = styled(Link)`
  color: #3498db;
  text-decoration: none;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

const Title = styled.h1`
  color: #2c3e50;
  margin: 1rem 0 0.5rem;
`;

const Meta = styled.p`
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 2rem;
`;

const Content = styled.p`
  color: #333;
  line-height: 1.8;
  font-size: 1.05rem;
`;

const Message = styled.p`
  color: #7f8c8d;
  text-align: center;
  margin-top: 3rem;
`;

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Container><Message>Carregando...</Message></Container>;
  if (!post) return <Container><Message>Post não encontrado.</Message></Container>;

  return (
    <Container>
      <BackLink to="/">← Voltar para Home</BackLink>
      <Title>{post.titulo}</Title>
      <Meta>Por: {post.autor}</Meta>
      <Content>{post.conteudo}</Content>
    </Container>
  );
}

export default PostDetail; 