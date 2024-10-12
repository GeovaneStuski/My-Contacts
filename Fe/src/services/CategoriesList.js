import HttpClient from './utils/HttpClient';

import CategoryMapper from './mappers/CategoryMapper';

class CategoriesService {
  constructor() {
    this.HttpClient = new HttpClient('http://localhost:3001');
  }

  async listCategories(signal) {
    const categories = await this.HttpClient.get('/categories', { signal });

    return categories.map(CategoryMapper.toDomain);
  }

  async createCategory(category) {
    const body = CategoryMapper.toPersistence(category);

    return this.HttpClient.post('/categories', { body });
  }

  async editCategory(category) {
    const body = CategoryMapper.toPersistence(category);
    const { id } = body;

    return this.HttpClient.put(`/categories/${id}`, { body });
  }

  async deleteCategory({ id }) {
    return this.HttpClient.delete(`/categories/${id}`);
  }
}

export default new CategoriesService();
