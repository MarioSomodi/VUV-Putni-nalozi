import { useState } from 'react';

const useForm = (validate, id, Success, apiInstance) => {
  const [values, setValues] = useState({
    uloga: '',
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
        .put(
          'Uloga/update.php',
          JSON.stringify({
            id: id,
            uloga: values.uloga,
          })
        )
        .then(({ data }) => {
          Success(data.message);
        })
        .catch((err) => {
          console.log('A problem ocurred while updating role:', err);
        });
    }
    setErrors(error);
  };

  return { handleChange, values, handleSubmit, errors };
};
export default useForm;
