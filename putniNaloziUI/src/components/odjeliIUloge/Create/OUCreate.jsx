import { React, useState } from 'react';
import './create.css';
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
import useForm from './useCreateForm';
import validate from './validateCreateData';

export default function EditUloga({ user }) {
  const [successMessage, setSuccessMessage] = useState('');
  const [data, setData] = useState(0);

  function Success(message) {
    setSuccessMessage(message);
    document.getElementById('submitButton').disabled = true;
    setTimeout(() => {
      document.getElementById('redirect').click();
    }, 2000);
  }

  const { handleChange, values, handleSubmit, errors } = useForm(
    validate,
    Success,
    data,
    user.token
  );
  return (
    <div className='create'>
      <Grid item xs>
        <Paper className='editContainer' elevation={6}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl
                  variant='outlined'
                  className='input'
                  fullWidth='true'
                >
                  <InputLabel id='labelUlogeIOdjeli'>
                    Izaberite sto kreirate
                  </InputLabel>
                  <Select
                    labelId='labelUlogeIOdjeli'
                    name='ulogeIOdjeli'
                    fullWidth='true'
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    label='ulogeIOdjeli'
                  >
                    <MenuItem value={1}>Odjel</MenuItem>
                    <MenuItem value={0}>Uloga</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth='true'
                  type='text'
                  name='naziv'
                  variant='outlined'
                  label={data === 1 ? 'Naziv odjela' : 'Naziv uloge'}
                  className='input'
                  value={values.naziv}
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
              Kreiraj {data === 1 ? 'odjel' : 'ulogu'}
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
