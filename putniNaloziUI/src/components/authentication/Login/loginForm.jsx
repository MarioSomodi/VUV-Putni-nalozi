import { React, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { FormHelperText } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import useForm from './useLoginForm';
import validate from './validateLoginData';
import '../authentication.css';

export default function LoginForm({ Success, switchToSignUp }) {
  const [error, setError] = useState('');
  const Failed = (failedError) => {
    setError(failedError);
  };

  const { handleChange, values, handleSubmit, errors } = useForm(
    validate,
    Success,
    Failed
  );

  return (
    <div className='boxContainer'>
      <div className='formContainer'>
        <form onSubmit={handleSubmit}>
          <TextField
            type='text'
            name='username'
            variant='outlined'
            label='Korisničko ime'
            className='input'
            value={values.username}
            onChange={handleChange}
          />
          {errors.username && (
            <FormHelperText className='helperText'>
              {errors.username}
            </FormHelperText>
          )}
          <TextField
            type='password'
            name='password'
            variant='outlined'
            label='Lozinka'
            className='input'
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && (
            <FormHelperText className='helperText'>
              {errors.password}
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
        <span className='mutedLink'>
          Nemate korisnički račun?{' '}
          <span
            tabIndex={0}
            onClick={switchToSignUp}
            onKeyPress={switchToSignUp}
            role='link'
            className='boldLink'
          >
            Registrirajte se
          </span>
        </span>
      </div>
    </div>
  );
}
