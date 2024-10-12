const ContactsRepositories = require('../Repositories/ContactsRepositories');

const isValidUUID = require('../utils/isValidUUID');

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;

    const contacts = await ContactsRepositories.findAll(orderBy);

    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid contact id' });
    }

    const contact = await ContactsRepositories.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    response.json(contact);
  }

  async store(request, response) {
    const {
      name, email, phone, category_id,
    } = request.body;

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid category' });
    }

    if (!name) return response.status(400).json({ error: 'Name is required' });

    if (email) {
      const contactExists = await ContactsRepositories.findByEmail(email);

      if (contactExists) {
        return response.status(400).json({ error: 'This Email is already in use' });
      }
    }

    const contact = await ContactsRepositories.create({
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });

    response.status(201).json(contact);
  }

  async update(request, response) {
    const { id } = request.params;

    const {
      name, email, phone, category_id,
    } = request.body;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid contact id' });
    }

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid category' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactExists = await ContactsRepositories.findById(id);

    if (!contactExists) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    if (email) {
      const emailInUse = await ContactsRepositories.findByEmail(email);

      if (emailInUse && emailInUse.email !== email) {
        return response.status(400).json({ error: 'This Email is already in use' });
      }
    }

    const contact = await ContactsRepositories.update(id, {
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });

    response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid contact id' });
    }

    await ContactsRepositories.delete(id);

    response.sendStatus(204);
  }

  async createOneThousandContacts(request, response) {
    const getContacts = await ContactsRepositories.findAll();
    const howManyContactsAreInDatabase = getContacts.length;

    try {
      for (let i = howManyContactsAreInDatabase; i < howManyContactsAreInDatabase + 1000; i++) {
        await ContactsRepositories.create({
          name: `Contato#${i}`,
          phone: '',
          email: null,
          category_id: null,
        });
      }
      response.sendStatus(204);
    } catch {
      response.sendStatus(400);
    }
  }
}

module.exports = new ContactController();
