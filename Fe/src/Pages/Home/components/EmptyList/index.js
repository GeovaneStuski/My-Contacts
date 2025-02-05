/* eslint-disable react/jsx-one-expression-per-line */
import { Container } from './styles';

import EmptyBox from '../../../../assets/images/empty-box.svg';

export default function EmptyList() {
  return (
    <Container>
      <img src={EmptyBox} alt="box" />
      <span>
        Você ainda não tem nenhum contato cadastrado!
        Clique no botão<strong>”Novo contato”</strong>
        à cima para cadastrar o seu primeiro!
      </span>
    </Container>
  );
}
