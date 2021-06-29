import { React, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useForm from './useLoginForm';
import validate from './validateLoginData';
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

export default function LoginForm(props) {
  const [error, setError] = useState('');
  const Failed = (error) => {
    setError(error);
  };

  const { handleChange, values, handleSubmit, errors } = useForm(
    validate,
    props.Success,
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
              label='Korisničko ime'
              className='input'
              value={values.korisnickoIme}
              onChange={handleChange}
            />
            {errors.korisnickoIme && (
              <FormHelperText className='helperText'>
                {errors.korisnickoIme}
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
            {error && (
              <FormHelperText className='helperText'>{error}</FormHelperText>
            )}
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className='input'
            >
              Prijavi se
            </Button>
          </form>
        </MuiThemeProvider>
        <span className='mutedLink'>
          Nemate korisnicki racun?{'  '}
          <span onClick={props.switchToSignUp} className='boldLink'>
            Registrirajte se
          </span>
        </span>
      </div>
    </div>
  );
}
