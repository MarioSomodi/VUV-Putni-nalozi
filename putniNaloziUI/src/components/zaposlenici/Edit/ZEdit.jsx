import { React, useState, useEffect } from 'react';
import './edit.css';
import { useParams } from 'react-router-dom';
import useForm from './useEditForm';
import validate from './validateEditData';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {
  Paper,
  Grid,
  TextField,
  FormHelperText,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5724c7',
    },
  },
});

export default function PNEdit(props) {
  let { idZaposlenika } = useParams();
  const [successMessage, setSuccessMessage] = useState('');
  const [update, setUpdate] = useState(1);
  function Success(message) {
    setSuccessMessage(message);
    document.getElementById('submitButton').disabled = true;
    setTimeout(() => {
      document.getElementById('redirect').click();
    }, 2000);
  }
  const [odjeli, setOdjeli] = useState([]);
  const [uloge, setUloge] = useState([]);
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + props.user.token);
  useEffect(() => {
    fetch(
      'http://localhost/Mario_Somodi/KV/VUV-Putni-nalozi/putniNaloziAPI/api/Zaposlenik/getSingle.php?idZaposlenika=' +
        idZaposlenika,
      {
        method: 'GET',
        mode: 'cors',
        headers: myHeaders,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        handleExistingValues(data);
      });
    fetch(
      'http://localhost/Mario_Somodi/KV/VUV-Putni-nalozi/putniNaloziAPI/api/Odjel/getAll.php',
      {
        method: 'GET',
        mode: 'cors',
        headers: myHeaders,
      }
    )
      .then((response) => response.json())
      .then((data) => setOdjeli(data));
    fetch(
      'http://localhost/Mario_Somodi/KV/VUV-Putni-nalozi/putniNaloziAPI/api/Uloga/getAll.php',
      {
        method: 'GET',
        mode: 'cors',
        headers: myHeaders,
      }
    )
      .then((response) => response.json())
      .then((data) => setUloge(data));
  }, []);
  const { handleChange, values, handleSubmit, errors } = useForm(
    validate,
    idZaposlenika,
    Success
  );
  const handleExistingValues = (data) => {
    values.ime = data.ime;
    values.prezime = data.prezime;
    values.korisnickoIme = data.korisnickoIme;
    values.slobodan = data.slobodan;
    values.odjel = data.idOdjela;
    values.uloga = data.idUloge;
    setUpdate(update + 1);
  };

  return (
    <div className='editZaposlenici'>
      <MuiThemeProvider theme={theme}>
        <Grid item xs>
          <Paper className='editContainer' elevation={6}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs>
                  <TextField
                    fullWidth='true'
                    type='text'
                    name='Ime'
                    variant='outlined'
                    label='Ime'
                    className='input'
                    value={values.ime}
                    onChange={handleChange}
                  />
                  {errors.ime && (
                    <FormHelperText className='helperText'>
                      {errors.ime}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth='true'
                    type='text'
                    name='prezime'
                    variant='outlined'
                    label='Prezime'
                    className='input'
                    value={values.prezime}
                    onChange={handleChange}
                  />
                  {errors.prezime && (
                    <FormHelperText className='helperText'>
                      {errors.prezime}
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>
              <TextField
                fullWidth='true'
                type='text'
                name='korisnickoIme'
                variant='outlined'
                label='Korisnicko ime'
                className='input'
                value={values.korisnickoIme}
                onChange={handleChange}
              />
              {errors.korisnickoIme && (
                <FormHelperText className='helperText'>
                  {errors.korisnickoIme}
                </FormHelperText>
              )}
              {odjeli && (
                <>
                  {}
                  <FormControl className='input' fullWidth='true'>
                    <InputLabel id='labelOdjel'>Odjel</InputLabel>
                    <Select
                      labelId='labelOdjel'
                      name='odjel'
                      fullWidth='true'
                      value={values.odjel}
                      onChange={handleChange}
                    >
                      {odjeli.map((odjel) => (
                        <MenuItem value={odjel.id}>{odjel.odjel}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {errors.odjel && (
                    <FormHelperText className='helperText'>
                      {errors.odjel}
                    </FormHelperText>
                  )}
                </>
              )}
              {uloge && (
                <>
                  <FormControl className='input' fullWidth='true'>
                    <InputLabel id='labelUloga'>Uloga</InputLabel>
                    <Select
                      labelId='labelUloga'
                      name='uloga'
                      fullWidth='true'
                      value={values.uloga}
                      onChange={handleChange}
                    >
                      {uloge.map((uloga) => (
                        <MenuItem value={uloga.id}>{uloga.uloga}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {errors.uloga && (
                    <FormHelperText className='helperText'>
                      {errors.uloga}
                    </FormHelperText>
                  )}
                </>
              )}
              <Link id='redirect' to='/Zaposlenici'></Link>
              <Button
                id='submitButton'
                fullWidth='true'
                type='submit'
                variant='contained'
                color='primary'
                className='input'
              >
                Azuriraj podatke zaposlenika
              </Button>

              {successMessage && (
                <FormHelperText className='successText'>
                  {successMessage}
                </FormHelperText>
              )}
            </form>
          </Paper>
        </Grid>
      </MuiThemeProvider>
    </div>
  );
}
