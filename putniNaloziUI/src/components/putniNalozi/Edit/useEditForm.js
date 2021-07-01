import { useState } from 'react';

const useForm = (validate, id, Success) => {
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
    if (Object.keys(error).length === 0) {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'html' },
        body: JSON.stringify({
          idPutnogNaloga: id,
          polaziste: values.polaziste,
          odrediste: values.odrediste,
          svrha: values.svrha,
          datumOdlaska: values.datumOdlaska,
          brojDana: values.brojDana,
          odobreno: values.odobreno,
          zaposlenici: [20],
        }),
      };
      fetch(
        'http://localhost/Mario_Somodi/KV/VUV-Putni-nalozi/putniNaloziAPI/api/PutniNalog/update.php',
        requestOptions
      )
        .then((response) => response.text())
        .then((data) => {
          Success(data);
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
