import { React, useState, useEffect } from 'react';
import './edit.css';
import { useParams } from 'react-router-dom';
import useForm from './useUlogaForm';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {
  Paper,
  Grid,
  TextField,
  FormHelperText,
  Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import validate from './validateUlogaData';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5724c7',
    },
  },
});

export default function EditUloga(props) {
  let { idUloge } = useParams();
  const [successMessage, setSuccessMessage] = useState('');
  const [update, setUpdate] = useState(1);

  function Success(message) {
    setSuccessMessage(message);
    document.getElementById('submitButton').disabled = true;
    setTimeout(() => {
      document.getElementById('redirect').click();
    }, 2000);
  }

  const { handleChange, values, handleSubmit, errors } = useForm(
    validate,
    idUloge,
    Success
  );

  const handleExistingValues = (data) => {
    values.uloga = data.uloga;
    setUpdate(update + 1);
  };

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + props.user.token);
  useEffect(() => {
    fetch(
      'http://localhost/Mario_Somodi/KV/VUV-Putni-nalozi/putniNaloziAPI/api/Uloga/getSingle.php?id=' +
        idUloge,
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
  }, []);
  return (
    <div className='edit'>
      <MuiThemeProvider theme={theme}>
        <Grid item xs>
          <Paper className='editContainer' elevation={6}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs>
                  <TextField
                    fullWidth='true'
                    type='text'
                    name='uloga'
                    variant='outlined'
                    label='Naziv uloge'
                    className='input'
                    value={values.uloga}
                    onChange={handleChange}
                  />
                  {errors.uloga && (
                    <FormHelperText className='helperText'>
                      {errors.uloga}
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>
              <Link id='redirect' to='/Odjeli-i-Uloge'></Link>
              <Button
                id='submitButton'
                fullWidth='true'
                type='submit'
                variant='contained'
                color='primary'
                className='input'
              >
                Azuriraj ulogu
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
