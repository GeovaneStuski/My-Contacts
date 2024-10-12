import { useRef } from 'react';
import ContactsList from '../../services/ContactsList';
import toast from '../../utils/toast';

export default function useNewContact() {
  const contactFormReference = useRef(null);

  async function handleSubmit(contact) {
    try {
      await ContactsList.createContact(contact);

      contactFormReference.current.resetFields();

      toast('success', 'Contato cadastrado com sucesso!');
    } catch {
      toast('danger', 'Erro ao tentar cadastrar o contato!');
    }
  }

  return {
    handleSubmit,
    contactFormReference,
  };
}
