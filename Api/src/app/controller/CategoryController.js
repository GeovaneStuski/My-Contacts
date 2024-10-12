const CategorysRepositories = require('../Repositories/CategorysRepositories');

class CategoryController {
  async index(request, response) {
    const categories = await CategorysRepositories.findAll();

    return response.json(categories);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      response.status(400).json({ error: 'Name is required' });
      return;
    }

    const nameExists = await CategorysRepositories.findByName(name);

    if (nameExists) {
      response.status(400).json({ error: 'This name already in use' });
      return;
    }

    const category = await CategorysRepositories.create(name);

    return response.status(201).json(category);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    if (!name) {
      response.status(400).json({ error: 'Name is required' });
      return;
    }

    const categoryExists = await CategorysRepositories.findById(id);

    if (!categoryExists) {
      return response.status(400).json({ error: 'Category not exists' });
    }

    const nameExists = await CategorysRepositories.findByName(name);

    if (nameExists && name !== categoryExists.name) {
      return response.status(400).json({ error: 'This name already in use' });
    }

    const row = await CategorysRepositories.update({ name, id });

    return response.status(200).json(row);
  }

  async delete(request, response) {
    const { id } = request.params;

    const categoryExists = await CategorysRepositories.findById(id);

    if (!categoryExists) {
      response.status(400).json({ error: 'Category not exists' });
      return;
    }

    await CategorysRepositories.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new CategoryController();
