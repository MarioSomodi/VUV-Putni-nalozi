import { useState } from 'react';

const useForm = (validate, id, Success, user, apiInstance) => {
  const [values, setValues] = useState({
    ime: '',
    prezime: '',
    korisnickoIme: '',
    slobodan: '',
    odjel: '',
    uloga: '',
    rolaToSet: '',
    rola: user.role === '1' ? '' : null,
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
    let error = validate(values);
    if (
      Object.prototype.hasOwnProperty.call(error, 'rolaToSet') &&
      Object.keys(error).length === 1
    ) {
      values.rola = values.rolaToSet;
      error = {};
    }
    if (Object.keys(error).length === 0) {
      apiInstance
        .put(
          'Zaposlenik/update.php',
          JSON.stringify({
            idZaposlenika: id,
            ime: values.ime,
            prezime: values.prezime,
            korisnickoIme: values.korisnickoIme,
            odjel: values.odjel,
            uloga: values.uloga,
            rola: values.rola,
          })
        )
        .then(({ data }) => {
          Success(data.message);
          if (id === user.id) {
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log('An error ocurred whilst updating employee info:', err);
        });
    }
    setErrors(error);
  };

  return { handleChange, values, handleSubmit, errors };
};

export default useForm;
