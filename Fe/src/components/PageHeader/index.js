import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import Arrow from '../../assets/images/arrow.svg';

import { Container } from './styles';

export default function PageHeader({ title }) {
  return (
    <Container>
      <Link to="/">
        <img src={Arrow} alt="Arrow" />
        <span>Voltar</span>
      </Link>
      <strong>
        {title}
      </strong>
    </Container>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
