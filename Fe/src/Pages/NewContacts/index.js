import ContactsForm from '../../components/ContactsForm';
import PageHeader from '../../components/PageHeader';

import useNewContact from './useNewContact';

export default function NewContacts() {
  const { handleSubmit, contactFormReference } = useNewContact();
  return (
    <>
      <PageHeader title="Novo contato" />

      <ContactsForm
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
        ref={contactFormReference}
      />
    </>
  );
}
