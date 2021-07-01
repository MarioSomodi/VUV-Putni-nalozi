import { useState } from 'react';

const useForm = (validate, Success, Failed) => {
  const [values, setValues] = useState({
    korisnickoIme: '',
    ime: '',
    prezime: '',
    lozinka: '',
    lozinka2: '',
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
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          korisnickoIme: values.korisnickoIme,
          lozinka: values.lozinka,
          ime: values.ime,
          prezime: values.prezime,
        }),
      };
      fetch(
        'http://localhost/Mario_Somodi/KV/VUV-Putni-nalozi/putniNaloziAPI/api/Authorization/register.php',
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
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
