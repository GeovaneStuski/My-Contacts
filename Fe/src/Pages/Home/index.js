import { Container } from './styles';

import useHome from './useHome';

import Modal from '../../components/Modal';
import Loader from '../../components/Loader';

import InputSearch from './components/InputSearch';
import Header from './components/Header';
import ErrorStatus from './components/ErrorStatus';
import SearchNotFound from './components/SearchNotFound';
import EmptyList from './components/EmptyList';
import ContactsList from './components/ContactsList';

export default function Home() {
  const {
    isLoadingDelete,
    isDeleteModalVisible,
    contactBeingDeleted,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    isLoading,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    filtredContacts,
    handleTryAgain,
    handleToggleOrderby,
    orderBy,
    handleDeleteContact,
  } = useHome();

  const hasContacts = contacts.length > 0;

  const isListEmpty = !hasError && (!isLoading && !hasContacts);

  const isSearchEmpty = !hasError && (hasContacts && filtredContacts.length < 1);

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {hasContacts && (
        <InputSearch
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      )}

      <Header
        hasError={hasError}
        qtyContacts={contacts.length}
        qtyFiltredContacts={filtredContacts.length}
      />

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}
      {isListEmpty && <EmptyList />}
      {isSearchEmpty && <SearchNotFound searchTerm={searchTerm} />}

      {hasContacts && (
        <>
          <ContactsList
            filtredContacts={filtredContacts}
            orderBy={orderBy}
            onToggleOrderBy={handleToggleOrderby}
            onDeleteContact={handleDeleteContact}
          />

          <Modal
            danger
            isLoading={isLoadingDelete}
            visible={isDeleteModalVisible}
            title={`Tem certeza que deseja remover o contato ”${contactBeingDeleted?.name}”?`}
            onCancel={handleCloseDeleteModal}
            onConfirm={handleConfirmDeleteContact}
            confirmLabel="Deletar"
          >
            <p>acão não pode ser desfeita</p>
          </Modal>
        </>
      )}

    </Container>
  );
}
