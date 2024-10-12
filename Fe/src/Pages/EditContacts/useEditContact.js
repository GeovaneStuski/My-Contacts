import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';
import ContactsList from '../../services/ContactsList';
import toast from '../../utils/toast';

export default function useEditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');

  const contactFormReference = useRef(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    const controller = new AbortController();

    async function loadContact() {
      try {
        const contact = await ContactsList.getContactById(id, controller.signal);

        safeAsyncAction(() => {
          contactFormReference.current.setFieldsValues(contact);

          setIsLoading(false);
          setContactName(contact.name);
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        safeAsyncAction(() => {
          navigate('/');
          toast('danger', 'Contato não encontrado!');
        });
      }
    }
    loadContact();

    return () => controller.abort();
  }, [id, navigate]);

  async function handleSubmit(contact) {
    try {
      const contactData = await ContactsList.editContact(id, contact);

      setContactName(contactData.name);

      toast('success', 'Contato editado com sucesso!');
    } catch {
      toast('danger', 'Erro ao tentar editar o contato!');
    }
  }

  return {
    isLoading,
    contactName,
    contactFormReference,
    handleSubmit,
  };
}
