/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Header({ hasError, qtyContacts, qtyFiltredContacts }) {
  const alignment = hasError
    ? 'flex-end'
    : (
      qtyContacts > 0
        ? 'space-between'
        : 'center'
    );

  return (
    <Container
      $justifycontent={alignment}
    >
      {(!hasError && qtyContacts > 0) && (
      <strong>
        {qtyFiltredContacts}
        {qtyFiltredContacts === 1 ? ' contato' : ' contatos'}
      </strong>
      )}

      <Link to="/new">Novo contato</Link>

    </Container>
  );
}

Header.propTypes = {
  hasError: PropTypes.bool.isRequired,
  qtyContacts: PropTypes.number.isRequired,
  qtyFiltredContacts: PropTypes.number.isRequired,
};
