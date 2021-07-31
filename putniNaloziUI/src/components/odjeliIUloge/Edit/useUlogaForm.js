import { useState } from 'react';

const useForm = (validate, id, Success) => {
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
    var error = validate(values);
    if (Object.keys(error).length === 0) {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'json' },
        body: JSON.stringify({
          id: id,
          uloga: values.uloga,
        }),
      };
      fetch(
        'http://localhost/Mario_Somodi/KV/VUV-Putni-nalozi/putniNaloziAPI/api/Uloga/update.php',
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          Success(data.message);
        })
        .catch((error) => {
          console.log(
            'There has been a problem with your fetch operation:',
            error
          );
        });
    }
    setErrors(error);
  };

  return { handleChange, values, handleSubmit, errors };
};
export default useForm;
