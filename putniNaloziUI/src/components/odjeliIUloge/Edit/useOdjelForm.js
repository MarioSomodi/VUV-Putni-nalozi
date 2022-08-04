import { useState } from 'react';

const useForm = (validate, id, Success, apiInstance) => {
  const [values, setValues] = useState({
    odjel: '',
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
          'Odjel/update.php',
          JSON.stringify({
            id: id,
            odjel: values.odjel,
          })
        )
        .then(({ data }) => {
          Success(data.message);
        })
        .catch((err) => {
          console.log('A problem ocurred while updating department:', err);
        });
    }
    setErrors(error);
  };

  return { handleChange, values, handleSubmit, errors };
};
export default useForm;
