import Loader from '../../components/Loader';

import PageHeader from '../../components/PageHeader';
import ContactsForm from '../../components/ContactsForm';

import useEditContact from './useEditContact';

export default function EditContacts() {
  const {
    isLoading,
    contactName,
    contactFormReference,
    handleSubmit,
  } = useEditContact();

  return (
    <>
      <Loader isLoading={isLoading} />

      <PageHeader title={isLoading ? 'Carregando...' : `Editar ${contactName}`} />

      <ContactsForm
        ref={contactFormReference}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
