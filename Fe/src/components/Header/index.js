import { Link } from 'react-router-dom';

import Logo from '../../assets/images/Logo.svg';

import { Container } from './styles';

export default function Header() {
  return (
    <Container>
      <Link to="/">
        <img src={Logo} width="201" alt="MyContacts-Logo" />
      </Link>
    </Container>
  );
}
