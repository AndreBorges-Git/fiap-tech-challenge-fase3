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

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-sizing: border-box;
`;

const PostCard = styled.div`
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const PostTitle = styled.h2`
  margin: 0 0 0.5rem;
  color: #2c3e50;
`;

const PostAuthor = styled.p`
  color: #7f8c8d;
  font-size: 0.9rem;
  margin: 0 0 1rem;
`;

const PostExcerpt = styled.p`
  color: #555;
  margin: 0 0 1rem;
`;

const ReadMore = styled(Link)`
  color: #3498db;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const Message = styled.p`
  color: #7f8c8d;
  text-align: center;
  margin-top: 3rem;
`;

function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = posts.filter(post =>
    post.titulo?.toLowerCase().includes(search.toLowerCase()) ||
    post.conteudo?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <Title>Todos os Posts</Title>
      <SearchInput
        type="text"
        placeholder="Buscar por título ou conteúdo..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {loading && <Message>Carregando posts...</Message>}
      {!loading && filtered.length === 0 && <Message>Nenhum post encontrado.</Message>}
      {filtered.map(post => (
        <PostCard key={post._id}>
          <PostTitle>{post.titulo}</PostTitle>
          <PostAuthor>Por: {post.autor}</PostAuthor>
          <PostExcerpt>{post.conteudo?.substring(0, 150)}...</PostExcerpt>
          <ReadMore to={`/post/${post._id}`}>Ler mais →</ReadMore>
        </PostCard>
      ))}
    </Container>
  );
}

export default Home;