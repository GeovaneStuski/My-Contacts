import { useState } from 'react';

import PropTypes from 'prop-types';

import CategoriesList from '../../services/CategoriesList';

import Modal from '../Modal';

import Input from '../Input';
import Select from '../Select';

import toast from '../../utils/toast';

export default function CategoriesModal({
  modalType, isVisible, categories, closeModal, onReloadCategories,
}) {
  const [categoryName, setCategoryName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChangeCategoryName(event) {
    setCategoryName(event.target.value);
  }

  function handleChangeCategoryId(event) {
    setCategoryId(event.target.value);
  }

  function clearCategoryFields() {
    setCategoryId('');
    setCategoryName('');
  }

  async function createCategory() {
    setIsSubmitting(true);
    try {
      await CategoriesList.createCategory({ name: categoryName });
      toast('success', 'Categoria registrada com sucesso!');
      onReloadCategories();
      clearCategoryFields();
    } catch {
      toast('danger', 'Erro ao registrar a categoria!');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function editCategory() {
    setIsSubmitting(true);
    try {
      await CategoriesList.editCategory({ name: categoryName, id: categoryId });
      toast('success', 'Categoria editada com sucesso!');
      onReloadCategories();
      clearCategoryFields();
    } catch {
      toast('danger', 'Erro ao editar a categoria!');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function deleteCategory() {
    setIsSubmitting(true);
    try {
      await CategoriesList.deleteCategory({ id: categoryId });
      toast('success', 'Categoria deletada com sucesso!');
      onReloadCategories();
      clearCategoryFields();
    } catch {
      toast('danger', 'Erro ao deletar a categoria!');
    } finally {
      setIsSubmitting(false);
    }
  }

  const categoryMenu = {
    create: {
      title: 'Criar categorias',
      confirmLabel: 'Registrar',
      onConfirm: createCategory,
    },
    edit: {
      title: 'Editar categorias',
      confirmLabel: 'Editar',
      onConfirm: editCategory,
    },
    delete: {
      title: 'Deletar categorias',
      confirmLabel: 'Deletar',
      onConfirm: deleteCategory,
    },
  };

  return (
    <Modal
      visible={isVisible}
      onCancel={closeModal}
      cancelLabel="Fechar"
      confirmLabel={categoryMenu[modalType]?.confirmLabel}
      title={categoryMenu[modalType]?.title || categoryMenu.create.title}
      danger={modalType === 'delete'}
      onConfirm={categoryMenu[modalType]?.onConfirm || categoryMenu.create.onConfirm}
      isLoading={isSubmitting}
    >
      {modalType === 'create' && (
        <Input
          placeholder="Digite o nome da nova categoria"
          value={categoryName}
          onChange={handleChangeCategoryName}
        />
      )}

      {modalType === 'edit' && (
        <>
          <Select value={categoryId} onChange={handleChangeCategoryId}>
            <option value="">Selecione a categoria</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </Select>
          <Input
            placeholder="Digite o novo nome da nova categoria"
            value={categoryName}
            onChange={handleChangeCategoryName}
          />
        </>
      )}

      {modalType === 'delete' && (
        <Select value={categoryId} onChange={handleChangeCategoryId}>
          <option value="">Selecione a categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </Select>
      )}
    </Modal>
  );
}

CategoriesModal.propTypes = {
  modalType: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  closeModal: PropTypes.func.isRequired,
  onReloadCategories: PropTypes.func.isRequired,
};
