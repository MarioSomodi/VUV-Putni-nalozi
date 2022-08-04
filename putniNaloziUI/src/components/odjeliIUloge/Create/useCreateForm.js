import { useState } from 'react';
import { getApiInstance } from '../../../api/apiInstance';

const useForm = (validate, Success, type, token) => {
  const apiInstance = getApiInstance(token);

  const [values, setValues] = useState({
    naziv: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validate(values);
    if (Object.keys(error).length === 0) {
      const url = type === 1 ? 'Odjel/create.php' : 'Uloga/create.php';
      const toCreate =
        type === 1
          ? JSON.stringify({
              odjel: values.naziv,
            })
          : JSON.stringify({
              uloga: values.naziv,
            });
      apiInstance
        .post(url, toCreate)
        .then(({ data }) => {
          Success(data.message);
        })
        .catch((err) => {
          console.log(
            'There has been a problem with creating an department or role:',
            err
          );
        });
    }
    setErrors(error);
  };

  return { handleChange, values, handleSubmit, errors };
};

export default useForm;
