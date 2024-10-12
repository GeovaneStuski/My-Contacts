import PropTypes from 'prop-types';

import { Container } from './styles';

import SearchNotFoundIcon from '../../../../assets/images/magnifier-question.svg';

export default function SearchNotFound({ searchTerm }) {
  return (
    <Container>
      <img src={SearchNotFoundIcon} alt="searchNotFound" />
      <span>{`Nenhum resultado foi encontrado para ”${searchTerm}”.`}</span>
    </Container>
  );
}

SearchNotFound.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};
