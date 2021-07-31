import { useState } from 'react';

const useForm = (validate, Success, selected) => {
  const [values, setValues] = useState({
    polaziste: '',
    odrediste: '',
    svrha: '',
    datumOdlaska: '',
    brojDana: '',
    odobreno: '',
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
    if (Object.keys(error).length === 0 && selected.length > 0) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'html' },
        body: JSON.stringify({
          polaziste: values.polaziste,
          odrediste: values.odrediste,
          svrha: values.svrha,
          datumOdlaska: values.datumOdlaska,
          brojDana: values.brojDana,
          odobreno: values.odobreno === false ? '0' : '1',
          zaposlenici: selected.map((data) => Number(data.value)),
        }),
      };
      fetch(
        'http://localhost/Mario_Somodi/KV/VUV-Putni-nalozi/putniNaloziAPI/api/PutniNalog/create.php',
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
    } else {
      if (selected.length === 0) {
        error.selected = 'Morate odabrati minimalno jednoga zaposlenika.';
      } else {
        error.selected = null;
      }
    }
    setErrors(error);
  };

  return { handleChange, values, handleSubmit, errors };
};

export default useForm;
