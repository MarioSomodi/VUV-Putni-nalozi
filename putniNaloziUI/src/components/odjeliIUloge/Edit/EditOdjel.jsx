import { React, useState, useEffect } from 'react';
import './edit.css';
import { useParams } from 'react-router-dom';
import useForm from './useOdjelForm';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {
  Paper,
  Grid,
  TextField,
  FormHelperText,
  Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import validate from './validateOdjelData';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5724c7',
    },
  },
});

export default function EditOdjel(props) {
  let { idOdjela } = useParams();
  const [successMessage, setSuccessMessage] = useState('');
  const [update, setUpdate] = useState(1);

  function Success(message) {
    setSuccessMessage(message);
    document.getElementById('submitButton').disabled = true;
    setTimeout(() => {
      document.getElementById('redirect').click();
    }, 2000);
  }

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('authorization', 'Bearer ' + props.user.token);

  const { handleChange, values, handleSubmit, errors } = useForm(
    validate,
    idOdjela,
    Success,
    myHeaders
  );

  const handleExistingValues = (data) => {
    values.odjel = data.odjel;
    setUpdate(update + 1);
  };

  useEffect(() => {
    fetch(
      'http://localhost/Mario_Somodi/KV/VUV-Putni-nalozi/putniNaloziAPI/api/Odjel/getSingle.php?id=' +
        idOdjela,
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
                    name='odjel'
                    variant='outlined'
                    label='Naziv odjela'
                    className='input'
                    value={values.odjel}
                    onChange={handleChange}
                  />
                  {errors.odjel && (
                    <FormHelperText className='helperText'>
                      {errors.odjel}
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
                Azuriraj odjel
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
