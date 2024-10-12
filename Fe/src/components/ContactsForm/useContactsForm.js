import {
  useEffect, useState, useImperativeHandle,
} from 'react';

import CategoriesList from '../../services/CategoriesList';
import useError from '../../hooks/useError';

import isEmailValid from '../../utils/isEmailValid';
import phoneFormater from '../../utils/phoneFormater';
import toast from '../../utils/toast';

export default function useContactsForm(onSubmit, ref) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [categoryModalType, setCategoryModalType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    setFieldsValues: (contacts) => {
      setName(contacts.name ?? '');
      setEmail(contacts.email ?? '');
      setPhone(contacts.phone ?? '');
      setCategoryId(contacts.category.id ?? '');
    },
    resetFields: () => {
      setName('');
      setEmail('');
      setPhone('');
      setCategoryId('');
    },
  }), []);

  async function LoadCategories(signal) {
    try {
      const listCategories = await CategoriesList.listCategories(signal);

      setCategories(listCategories);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }
      toast('danger', 'Erro ao carregar as categorias!');
    } finally {
      setIsLoadingCategories(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();

    LoadCategories(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  const {
    setErrors,
    removeErrors,
    getErrorMensageByFieldName,
    errors,
  } = useError();

  const isFormValid = (name && errors.length === 0);

  function handleChangeName(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setErrors({ field: 'name', mensage: 'nome é requirido' });
    } else {
      removeErrors('name');
    }
  }

  function handleChangeEmail(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setErrors({ field: 'email', mensage: 'email invalido' });
    } else {
      removeErrors('email');
    }
  }

  function handleChangePhone(event) {
    setPhone(phoneFormater(event.target.value));
  }

  function handleChangeCategoryId(event) {
    setCategoryId(event.target.value);
  }

  async function handleSumit(event) {
    setIsSubmitting(true);

    event.preventDefault();

    await onSubmit({
      name,
      email,
      phone,
      categoryId,
    });

    setIsSubmitting(false);
  }

  function handleDropDownVisible() {
    setIsDropDownVisible(true);
  }

  function handleDropDownClose() {
    setIsDropDownVisible(false);
    console.log('close');
  }

  function handleModalType(type) {
    setCategoryModalType(type);
    setCategoryModalOpen(true);
  }

  function handleCategoryCloseModal() {
    setCategoryModalOpen(false);
    setCategoryModalType('');
  }

  return {
    handleSumit,
    handleChangeCategoryId,
    getErrorMensageByFieldName,
    categories,
    name,
    handleChangeName,
    handleChangeEmail,
    email,
    phone,
    handleChangePhone,
    isLoadingCategories,
    categoryId,
    isFormValid,
    isSubmitting,
    handleDropDownVisible,
    isDropDownVisible,
    handleModalType,
    categoryModalType,
    categoryModalOpen,
    handleCategoryCloseModal,
    LoadCategories,
    handleDropDownClose,
  };
}
