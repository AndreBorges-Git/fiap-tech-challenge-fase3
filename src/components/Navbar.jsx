import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #2c3e50;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1.4rem;
  font-weight: bold;
`;

const Links = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #ecf0f1;
  text-decoration: none;
  font-size: 1rem;

  &:hover {
    color: #3498db;
  }
`;

const LogoutBtn = styled.button`
  color: #ecf0f1;
  background: none;
  border: 1px solid #ecf0f1;
  border-radius: 6px;
  padding: 0.3rem 0.8rem;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    background-color: #e74c3c;
    border-color: #e74c3c;
  }
`;

function Navbar() {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  return (
    <Nav>
      <Logo to="/">📚 Blog FIAP</Logo>
      <Links>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/criar">Novo Post</NavLink>
        {isAdmin ? (
          <>
            <NavLink to="/admin">Admin</NavLink>
            <LogoutBtn onClick={handleLogout}>Sair</LogoutBtn>
          </>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </Links>
    </Nav>
  );
}

export default Navbar;