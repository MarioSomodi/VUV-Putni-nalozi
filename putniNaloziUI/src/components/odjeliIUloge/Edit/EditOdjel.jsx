import { React, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Paper,
  Grid,
  TextField,
  FormHelperText,
  Button,
} from '@material-ui/core';
import useForm from './useOdjelForm';
import './edit.css';
import validate from './validateOdjelData';
import { getApiInstance } from '../../../api/apiInstance';

export default function EditOdjel({ user }) {
  const { idOdjela } = useParams();
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
    idOdjela,
    Success,
    apiInstance
  );

  const handleExistingValues = (data) => {
    values.odjel = data.odjel;
    setUpdate(update + 1);
  };

  useEffect(() => {
    apiInstance.get(`Odjel/getSingle.php?id=${idOdjela}`).then(({ data }) => {
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
            <Link id='redirect' to='/Odjeli-i-Uloge' />
            <Button
              id='submitButton'
              fullWidth='true'
              type='submit'
              variant='contained'
              color='primary'
              className='input'
            >
              Ažuriraj odjel
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
