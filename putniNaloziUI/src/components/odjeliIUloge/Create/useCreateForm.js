import { useState } from 'react';

const useForm = (validate, Success, type, token) => {
  const [values, setValues] = useState({
    naziv: '',
  });
  const [errors, setErrors] = useState({});

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('authorization', 'Bearer ' + token);

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
      const url =
        type === 1
          ? 'http://localhost/Mario_Somodi/KV/VUV-Putni-nalozi/putniNaloziAPI/api/Odjel/create.php'
          : 'http://localhost/Mario_Somodi/KV/VUV-Putni-nalozi/putniNaloziAPI/api/Uloga/create.php';
      const requestOptions =
        type === 1
          ? {
              method: 'POST',
              headers: myHeaders,
              body: JSON.stringify({
                odjel: values.naziv,
              }),
            }
          : {
              method: 'POST',
              headers: myHeaders,
              body: JSON.stringify({
                uloga: values.naziv,
              }),
            };
      fetch(url, requestOptions)
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
