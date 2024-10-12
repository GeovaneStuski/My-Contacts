import HttpClient from './utils/HttpClient';

import ContactMapper from './mappers/ContactMapper';

class ContactsServices {
  constructor() {
    this.HttpClient = new HttpClient('http://localhost:3001');
  }

  async listContacts(orderBy, signal) {
    const contacts = await this.HttpClient.get(`/contacts?orderBy=${orderBy || 'asc'}`, { signal });

    return contacts.map(ContactMapper.toDomain);
  }

  async getContactById(id, signal) {
    const contact = await this.HttpClient.get(`/contacts/${id}`, { signal });

    return ContactMapper.toDomain(contact);
  }

  createContact(contact) {
    const body = ContactMapper.toPersistence(contact);

    return this.HttpClient.post('/contacts', { body });
  }

  editContact(id, contact) {
    const body = ContactMapper.toPersistence(contact);

    return this.HttpClient.put(`/contacts/${id}`, { body });
  }

  deleteContact(id) {
    return this.HttpClient.delete(`/contacts/${id}`);
  }
}

export default new ContactsServices();
