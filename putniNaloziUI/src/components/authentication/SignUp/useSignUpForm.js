import { useState } from 'react';
import { apiInstance } from '../../../api/apiInstance';

const useForm = (validate, Success, Failed) => {
  const [values, setValues] = useState({
    username: '',
    name: '',
    lastname: '',
    password: '',
    confirmPassword: '',
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
          'Authorization/register.php',
          JSON.stringify({
            username: values.username,
            password: values.password,
            name: values.name,
            lastname: values.lastname,
          })
        )
        .then(({ data }) => {
          if (data.status === 'false') {
            error.register = data.error;
            Failed(error.register);
          } else {
            Success(data.message);
            Failed(null);
          }
        });
    }
    setErrors(error);
  };

  return { handleChange, values, handleSubmit, errors };
};

export default useForm;
