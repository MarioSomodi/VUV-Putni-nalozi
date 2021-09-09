import { useState } from 'react';

const useForm = (validate, id, Success, user, myHeaders) => {
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
    var error = validate(values);
    if (error.hasOwnProperty('rolaToSet') && Object.keys(error).length === 1) {
      values.rola = values.rolaToSet;
      error = {};
    }
    if (Object.keys(error).length === 0) {
      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify({
          idZaposlenika: id,
          ime: values.ime,
          prezime: values.prezime,
          korisnickoIme: values.korisnickoIme,
          odjel: values.odjel,
          uloga: values.uloga,
          rola: values.rola,
        }),
      };
      fetch(
        'http://localhost/Mario_Somodi/KV/VUV-Putni-nalozi/putniNaloziAPI/api/Zaposlenik/update.php',
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          Success(data.message);
          if (id === user.id) {
            window.location.reload();
          }
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
