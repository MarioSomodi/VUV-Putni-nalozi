import { useState } from 'react';

const useForm = (validate, id, Success, myHeaders) => {
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
    var error = validate(values);
    if (Object.keys(error).length === 0) {
      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify({
          id: id,
          odjel: values.odjel,
        }),
      };
      fetch(
        'http://localhost/Mario_Somodi/KV/VUV-Putni-nalozi/putniNaloziAPI/api/Odjel/update.php',
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
