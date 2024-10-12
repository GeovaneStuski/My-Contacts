import PropTypes from 'prop-types';

import { Container } from './styles';

import Sad from '../../../../assets/images/sad.svg';

import Button from '../../../../components/Button';

export default function ErrorStatus({ onTryAgain }) {
  return (
    <Container>
      <img src={Sad} alt="sad" />
      <div className="details">
        <span>Ocorreu um erro ao obter os seus contatos!</span>
        <Button onClick={onTryAgain} type="button">Tente Novamente</Button>
      </div>
    </Container>
  );
}

ErrorStatus.propTypes = {
  onTryAgain: PropTypes.func.isRequired,
};
