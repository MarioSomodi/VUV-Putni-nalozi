import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './authentication.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5724c7',
    },
  },
});

export default function SignUpForm(props) {
  return (
    <div className='boxContainer'>
      <div className='formContainer'>
        <MuiThemeProvider theme={theme}>
          <form>
            <TextField
              type='text'
              variant='outlined'
              label='Korisničko ime'
              className='input'
            />
            <TextField
              type='password'
              variant='outlined'
              label='Lozinka'
              className='input'
            />
            <TextField
              type='password'
              variant='outlined'
              label='Potvrdite lozinku'
              className='input'
            />
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className='input'
            >
              Registriraj se
            </Button>
          </form>
        </MuiThemeProvider>
        <span className='mutedLink'>
          Vec imate korisnicki racun?{'  '}
          <span onClick={props.switchToSignIn} className='boldLink'>
            Prijavite se
          </span>
        </span>
      </div>
    </div>
  );
}
