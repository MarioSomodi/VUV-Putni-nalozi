import { useState } from 'react';

const useForm = (validate, Success, selected, apiInstance) => {
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
    const error = validate(values);
    if (Object.keys(error).length === 0 && selected.length > 0) {
      apiInstance
        .post(
          'PutniNalog/create.php',
          JSON.stringify({
            polaziste: values.polaziste,
            odrediste: values.odrediste,
            svrha: values.svrha,
            datumOdlaska: values.datumOdlaska,
            brojDana: values.brojDana,
            odobreno: values.odobreno === false ? '0' : '1',
            zaposlenici: selected.map((data) => Number(data.value)),
          })
        )
        .then(({ data }) => {
          Success(data.message);
        })
        .catch((err) => {
          console.log(
            'A problem ocurred whilst adding a new travel document:',
            err
          );
        });
    } else if (selected.length === 0) {
      error.selected = 'Morate odabrati minimalno jednoga zaposlenika.';
    }
    error.selected = null;
    setErrors(error);
  };

  return { handleChange, values, handleSubmit, errors };
};

export default useForm;
