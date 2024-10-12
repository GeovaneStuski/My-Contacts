import { useCallback, useState } from 'react';

export default function useError() {
  const [errors, setError] = useState([]);

  const setErrors = useCallback(({ field, mensage }) => {
    if (errors.find((error) => error.field === field)) {
      return;
    }

    setError((prevState) => [...prevState,
      { field, mensage },
    ]);
  }, [errors]);

  const removeErrors = useCallback((fieldName) => {
    setError((prevState) => prevState.filter((error) => error.field !== fieldName));
  }, []);

  const getErrorMensageByFieldName = useCallback((fieldName) => (
    errors.find((error) => error.field === fieldName)?.mensage
  ), [errors]);

  return {
    setErrors, removeErrors, getErrorMensageByFieldName, errors,
  };
}
