import { React, useState, useEffect } from 'react';
import './edit.css';
import { useParams, Link } from 'react-router-dom';
import {
  Paper,
  Grid,
  TextField,
  FormHelperText,
  Button,
} from '@material-ui/core';
import validate from './validateUlogaData';
import useForm from './useUlogaForm';
import { getApiInstance } from '../../../api/apiInstance';

export default function EditUloga({ user }) {
  const { idUloge } = useParams();
  const apiInstance = getApiInstance(user.token);
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
    Success,
    apiInstance
  );

  const handleExistingValues = (data) => {
    values.uloga = data.uloga;
    setUpdate(update + 1);
  };

  useEffect(() => {
    apiInstance.get(`Uloga/getSingle.php?id=${idUloge}`).then(({ data }) => {
      handleExistingValues(data);
    });
  }, []);

  return (
    <div className='edit'>
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
            <Link id='redirect' to='/Odjeli-i-Uloge' />
            <Button
              id='submitButton'
              fullWidth='true'
              type='submit'
              variant='contained'
              color='primary'
              className='input'
            >
              Ažuriraj ulogu
            </Button>
            {successMessage && (
              <FormHelperText className='successText'>
                {successMessage}
              </FormHelperText>
            )}
          </form>
        </Paper>
      </Grid>
    </div>
  );
}
