import { useState } from 'react';

const useForm = (validate, Success, myHeaders) => {
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
    var error = validate(values);
    if (Object.keys(error).length === 0) {
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
          ime: values.ime,
          prezime: values.prezime,
          korisnickoIme: values.korisnickoIme,
          odjel: values.odjel,
          uloga: values.uloga,
          lozinka: values.lozinka,
          rola: values.rola,
        }),
      };
      fetch(
        'http://localhost/Mario_Somodi/KV/VUV-Putni-nalozi/putniNaloziAPI/api/Zaposlenik/create.php',
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
