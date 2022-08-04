import { useState } from 'react';

const useForm = (validate, Success, apiInstance) => {
  const [values, setValues] = useState({
    ime: '',
    prezime: '',
    korisnickoIme: '',
    odjel: '',
    uloga: '',
    rola: 0,
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
    const error = validate(values);
    if (Object.keys(error).length === 0) {
      apiInstance
        .post(
          'Zaposlenik/create.php',
          JSON.stringify({
            ime: values.ime,
            prezime: values.prezime,
            korisnickoIme: values.korisnickoIme,
            odjel: values.odjel,
            uloga: values.uloga,
            lozinka: values.lozinka,
            rola: values.rola,
          })
        )
        .then(({ data }) => {
          Success(data.message);
        })
        .catch((err) => {
          console.log('A problem ocurred whilst creating a new employee:', err);
        });
    }
    setErrors(error);
  };

  return { handleChange, values, handleSubmit, errors };
};

export default useForm;
