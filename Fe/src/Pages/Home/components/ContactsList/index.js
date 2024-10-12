import { Link } from 'react-router-dom';

import { memo } from 'react';

import PropTypes from 'prop-types';

import Arrow from '../../../../assets/images/arrow.svg';
import trash from '../../../../assets/images/trash.svg';
import edit from '../../../../assets/images/edit.svg';

import { ListHeader, Card } from './styles';

import formatPhone from '../../../../utils/phoneFormater';

function ContactsList({
  filtredContacts,
  orderBy,
  onToggleOrderBy,
  onDeleteContact,
}) {
  return (
    <>
      {filtredContacts.length > 0 && (
        <ListHeader direction={orderBy}>
          <button
            type="button"
            onClick={onToggleOrderBy}
          >
            <span>Nome</span>
            <img src={Arrow} alt="Arrow" />
          </button>
        </ListHeader>
      )}

      {filtredContacts.map((contact) => (
        <Card key={contact.id}>
          <div className="info">
            <div className="contact-name">
              <strong>{contact.name}</strong>
              {contact.category.name && <small>{contact.category.name}</small>}
            </div>
            <span>{contact.email}</span>
            <span>{formatPhone(contact.phone)}</span>
          </div>
          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img src={edit} alt="edit" />
            </Link>
            <button onClick={() => onDeleteContact(contact)} type="button">
              <img src={trash} alt="trash" />
            </button>
          </div>
        </Card>
      ))}
    </>
  );
}

ContactsList.propTypes = {
  filtredContacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    phone: PropTypes.string,
    category: PropTypes.shape({
      name: PropTypes.string,
    }),
  })).isRequired,
  orderBy: PropTypes.string.isRequired,
  onToggleOrderBy: PropTypes.func.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default memo(ContactsList);
