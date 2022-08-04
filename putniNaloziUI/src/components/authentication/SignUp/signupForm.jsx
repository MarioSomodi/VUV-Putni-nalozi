import { React, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FormHelperText } from '@material-ui/core';
import useForm from './useSignUpForm';
import validate from './validateSignUpData';
import '../authentication.css';

export default function SignUpForm({ switchToSignIn }) {
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const Success = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      switchToSignIn();
    }, 2000);
  };
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
            label='Korisničko name'
            className='input'
            value={values.username}
            onChange={handleChange}
          />
          {errors.username && (
            <FormHelperText className='helperText'>
              {errors.username}
            </FormHelperText>
          )}
          {error && (
            <FormHelperText className='helperText'>{error}</FormHelperText>
          )}
          <TextField
            type='text'
            name='name'
            variant='outlined'
            label='Ime'
            className='input'
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && (
            <FormHelperText className='helperText'>
              {errors.name}
            </FormHelperText>
          )}
          <TextField
            type='text'
            name='lastname'
            variant='outlined'
            label='Prezime'
            className='input'
            value={values.lastname}
            onChange={handleChange}
          />
          {errors.lastname && (
            <FormHelperText className='helperText'>
              {errors.lastname}
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
          <TextField
            type='password'
            name='confirmPassword'
            variant='outlined'
            label='Potvrdite lozinku'
            className='input'
            value={values.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <FormHelperText className='helperText'>
              {errors.confirmPassword}
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
        <span className='mutedLink register'>
          Vec imate korisnički račun?{'  '}
          <span
            role='link'
            tabIndex={0}
            onKeyPress={switchToSignIn}
            onClick={switchToSignIn}
            className='boldLink'
          >
            Prijavite se
          </span>
        </span>
      </div>
    </div>
  );
}
