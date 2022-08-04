import { useState } from 'react';
import { apiInstance } from '../../../api/apiInstance';

const useForm = (validate, Success, Failed) => {
  const [values, setValues] = useState({
    username: '',
    password: '',
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
      apiInstance
        .post(
          'Authorization/auth.php',
          JSON.stringify({
            username: values.username,
            password: values.password,
          })
        )
        .then(({ data }) => {
          if (data.status === 'false') {
            error.login = data.error;
            Failed(error.login);
          } else {
            Success(data);
            Failed(null);
          }
        });
    }
    setErrors(error);
  };

  return { handleChange, values, handleSubmit, errors };
};

export default useForm;
