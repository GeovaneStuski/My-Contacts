import {
  useEffect, useState, useCallback, useDeferredValue,
  useMemo,
} from 'react';

import ContactsService from '../../services/ContactsList';

import toast from '../../utils/toast';

export default function useHome() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState();
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const filtredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
  )), [contacts, deferredSearchTerm]);

  const loadContacts = useCallback(async (signal) => {
    try {
      setIsLoading(true);

      const ContactsList = await ContactsService.listContacts(orderBy, signal);

      setHasError(false);
      setContacts(ContactsList);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }

      setHasError(true);
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    const controller = new AbortController();

    loadContacts(controller.signal);

    return () => controller.abort();
  }, [loadContacts]);

  const handleToggleOrderby = useCallback(() => {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }, []);

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  const handleDeleteContact = useCallback((contact) => {
    setContactBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  }, []);

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  async function handleConfirmDeleteContact() {
    setIsLoadingDelete(true);

    try {
      await ContactsService.deleteContact(contactBeingDeleted.id);

      setContacts((prevState) => prevState.filter((contact) => (
        contact.id !== contactBeingDeleted.id
      )));

      handleCloseDeleteModal();
      toast('success', 'Contato deletado com sucesso  !');
    } catch {
      toast('danger', 'Erro ao deletar contato!');
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return {
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
  };
}
