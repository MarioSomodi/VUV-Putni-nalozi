import { React, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useForm from './useSignUpForm';
import validate from './validateSignUpData';
import { FormHelperText } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import '../authentication.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5724c7',
    },
  },
});

export default function SignUpForm(props) {
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const Success = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      props.switchToSignIn();
    }, 2000);
  };
  const Failed = (error) => {
    setError(error);
  };
  const { handleChange, values, handleSubmit, errors } = useForm(
    validate,
    Success,
    Failed
  );

  return (
    <div className='boxContainer'>
      <div className='formContainer'>
        <MuiThemeProvider theme={theme}>
          <form onSubmit={handleSubmit}>
            <TextField
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
            {error && (
              <FormHelperText className='helperText'>{error}</FormHelperText>
            )}
            <TextField
              type='text'
              name='ime'
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
            <TextField
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
            <TextField
              type='password'
              name='lozinka'
              variant='outlined'
              label='Lozinka'
              className='input'
              value={values.lozinka}
              onChange={handleChange}
            />
            {errors.lozinka && (
              <FormHelperText className='helperText'>
                {errors.lozinka}
              </FormHelperText>
            )}
            <TextField
              type='password'
              name='lozinka2'
              variant='outlined'
              label='Potvrdite lozinku'
              className='input'
              value={values.lozinka2}
              onChange={handleChange}
            />
            {errors.lozinka2 && (
              <FormHelperText className='helperText'>
                {errors.lozinka2}
              </FormHelperText>
            )}
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className='input'
            >
              Registriraj se
            </Button>
            {successMessage && (
              <FormHelperText className='successText'>
                {successMessage}
              </FormHelperText>
            )}
          </form>
        </MuiThemeProvider>
        <span className='mutedLink register'>
          Vec imate korisnicki racun?{'  '}
          <span onClick={props.switchToSignIn} className='boldLink'>
            Prijavite se
          </span>
        </span>
      </div>
    </div>
  );
}
