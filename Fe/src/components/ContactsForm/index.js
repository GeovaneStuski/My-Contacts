import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import dropDownIcon from '../../assets/images/circle-arrow-down.svg';

import { Container } from './styles';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import DropDown from '../DropDown';
import CategoriesModal from '../CategoriesModal';

import useContactsForm from './useContactsForm';

const ContactsForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const {
    name,
    email,
    phone,
    categoryId,
    handleChangeName,
    handleChangeEmail,
    handleChangePhone,
    handleChangeCategoryId,
    handleSumit,
    getErrorMensageByFieldName,
    categories,
    isLoadingCategories,
    isFormValid,
    isSubmitting,
    isDropDownVisible,
    handleDropDownVisible,
    categoryModalType,
    handleModalType,
    categoryModalOpen,
    handleCategoryCloseModal,
    LoadCategories,
    handleDropDownClose,

  } = useContactsForm(onSubmit, ref);

  return (
    <Container onSubmit={handleSumit} noValidate>
      <CategoriesModal
        isVisible={categoryModalOpen}
        modalType={categoryModalType}
        closeModal={handleCategoryCloseModal}
        categories={categories}
        onReloadCategories={LoadCategories}
      />
      <FormGroup error={getErrorMensageByFieldName('name')}>
        <Input
          $error={getErrorMensageByFieldName('name')}
          placeholder="Nome"
          value={name}
          onChange={handleChangeName}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup error={getErrorMensageByFieldName('email')}>
        <Input
          type="email"
          $error={getErrorMensageByFieldName('email')}
          placeholder="Email"
          value={email}
          onChange={handleChangeEmail}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup error={getErrorMensageByFieldName('phone')}>
        <Input
          $error={getErrorMensageByFieldName('phone')}
          placeholder="Telefone"
          value={phone}
          onChange={handleChangePhone}
          maxLength={15}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup isLoading={isLoadingCategories}>
        <div className="select-container">
          <Select
            value={categoryId}
            onChange={handleChangeCategoryId}
            disabled={isLoadingCategories || isSubmitting}
          >
            <option value="">Sem Categoria</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </Select>
          <button
            type="button"
            onMouseEnter={handleDropDownVisible}
          >
            <img src={dropDownIcon} alt="dropDownIcon" />
          </button>
          <DropDown
            visible={isDropDownVisible}
            onLeave={handleDropDownClose}
          >
            <li onClick={() => handleModalType('create')}>Criar</li>
            <li onClick={() => handleModalType('edit')}>Editar</li>
            <li onClick={() => handleModalType('delete')}>Deletar</li>
          </DropDown>
        </div>
      </FormGroup>

      <Button
        disabled={!isFormValid}
        type="submit"
        isLoading={isSubmitting}
      >
        {buttonLabel}
      </Button>
    </Container>
  );
});

ContactsForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ContactsForm;
