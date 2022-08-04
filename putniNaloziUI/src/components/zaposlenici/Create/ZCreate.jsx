import { React, useState, useEffect } from 'react';
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
import { getApiInstance } from '../../../api/apiInstance';

export default function PNEdit({ user }) {
  const [successMessage, setSuccessMessage] = useState('');
  const [odjeli, setOdjeli] = useState([]);
  const [uloge, setUloge] = useState([]);
  const apiInstance = getApiInstance(user.token);

  function Success(message) {
    setSuccessMessage(message);
    document.getElementById('submitButton').disabled = true;
    setTimeout(() => {
      document.getElementById('redirect').click();
    }, 2000);
  }

  useEffect(() => {
    apiInstance.get('Odjel/getAll.php').then(({ data }) => setOdjeli(data));
    apiInstance.get('Uloga/getAll.php').then(({ data }) => setUloge(data));
  }, []);

  const { handleChange, values, handleSubmit, errors } = useForm(
    validate,
    Success,
    apiInstance
  );

  return (
    <div className='editZaposlenici'>
      <Grid item xs>
        <Paper className='editContainer' elevation={6}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs>
                <TextField
                  fullWidth='true'
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
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth='true'
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth='true'
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
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth='true'
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
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth='true'
                  type='password'
                  name='lozinka2'
                  variant='outlined'
                  label='Potvrdi lozinku'
                  className='input'
                  value={values.lozinka2}
                  onChange={handleChange}
                />
                {errors.lozinka2 && (
                  <FormHelperText className='helperText'>
                    {errors.lozinka2}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={6}>
                {odjeli && (
                  <>
                    <FormControl
                      variant='outlined'
                      className='input'
                      fullWidth='true'
                    >
                      <InputLabel id='labelOdjel'>Odjel</InputLabel>
                      <Select
                        labelId='labelOdjel'
                        name='odjel'
                        label='Odjel'
                        fullWidth='true'
                        value={values.odjel}
                        onChange={handleChange}
                      >
                        {odjeli.map((odjel) => (
                          <MenuItem value={odjel.id}>{odjel.odjel}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {errors.odjel && (
                      <FormHelperText className='helperText'>
                        {errors.odjel}
                      </FormHelperText>
                    )}
                  </>
                )}
              </Grid>
              <Grid item xs={6}>
                {uloge && (
                  <>
                    <FormControl
                      variant='outlined'
                      className='input'
                      fullWidth='true'
                    >
                      <InputLabel id='labelUloga'>Uloga</InputLabel>
                      <Select
                        labelId='labelUloga'
                        label='uloga'
                        name='uloga'
                        fullWidth='true'
                        value={values.uloga}
                        onChange={handleChange}
                      >
                        {uloge.map((uloga) => (
                          <MenuItem value={uloga.id}>{uloga.uloga}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {errors.uloga && (
                      <FormHelperText className='helperText'>
                        {errors.uloga}
                      </FormHelperText>
                    )}
                  </>
                )}
              </Grid>
              {user.role === '1' ? (
                <Grid item xs={12}>
                  <FormControl
                    variant='outlined'
                    className='input'
                    fullWidth='true'
                  >
                    <InputLabel id='labelRola'>Rola</InputLabel>
                    <Select
                      labelId='labelRola'
                      name='rola'
                      fullWidth='true'
                      value={values.rola}
                      onChange={handleChange}
                      label='Rola'
                    >
                      <MenuItem value={1}>Administrator</MenuItem>
                      <MenuItem value={0}>Korisnik</MenuItem>
                    </Select>
                  </FormControl>
                  {errors.rola && (
                    <FormHelperText className='helperText'>
                      {errors.rola}
                    </FormHelperText>
                  )}
                </Grid>
              ) : (
                ''
              )}
            </Grid>
            <Link id='redirect' to='/Zaposlenici' />
            <Button
              id='submitButton'
              fullWidth='true'
              type='submit'
              variant='contained'
              color='primary'
              className='input'
            >
              Zaposli zaposlenika
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
