import { React, useState, useEffect } from 'react';
import './create.css';
import { Link } from 'react-router-dom';
import MultiSelect from 'react-multi-select-component';
import {
  Paper,
  Grid,
  TextField,
  FormHelperText,
  Button,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import useForm from './useCreateForm';
import validate from './validateCreateData';
import { getApiInstance } from '../../../api/apiInstance';

export default function PNCreate({ user }) {
  const apiInstance = getApiInstance(user.token);
  const [successMessage, setSuccessMessage] = useState('');
  const [selected, setSelected] = useState([]);
  const [items, setItems] = useState([]);
  const [odobreno, setOdobreno] = useState(false);

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
    selected,
    apiInstance
  );

  useEffect(() => {
    values.odobreno = false;
    apiInstance.get('Zaposlenik/setAvailability.php');
    apiInstance.get('Zaposlenik/getAll.php').then(({ data }) => {
      setItems(
        data
          .map((zaposlenik) => {
            if (zaposlenik.slobodan === '1') {
              return {
                label: `${zaposlenik.ime} ${zaposlenik.prezime}`,
                value: zaposlenik.idZaposlenika,
              };
            }
            return null;
          })
          .filter((x) => !!x)
      );
    });
  }, []);

  const handleSwitch = () => {
    values.odobreno = !odobreno;
    setOdobreno(!odobreno);
  };

  return (
    <div className='create'>
      <Grid item xs>
        <Paper className='editContainer' elevation={6}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs>
                <TextField
                  fullWidth='true'
                  type='text'
                  name='polaziste'
                  variant='outlined'
                  label='Polazište'
                  className='input'
                  value={values.polaziste}
                  onChange={handleChange}
                />
                {errors.polaziste && (
                  <FormHelperText className='helperText'>
                    {errors.polaziste}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth='true'
                  type='text'
                  name='odrediste'
                  variant='outlined'
                  label='Odredište'
                  className='input'
                  value={values.odrediste}
                  onChange={handleChange}
                />
                {errors.odrediste && (
                  <FormHelperText className='helperText'>
                    {errors.odrediste}
                  </FormHelperText>
                )}
              </Grid>
            </Grid>
            <TextField
              fullWidth='true'
              type='text'
              name='svrha'
              variant='outlined'
              label='Svrha'
              className='input'
              value={values.svrha}
              onChange={handleChange}
            />
            {errors.svrha && (
              <FormHelperText className='helperText'>
                {errors.svrha}
              </FormHelperText>
            )}
            <TextField
              fullWidth='true'
              type='date'
              name='datumOdlaska'
              variant='outlined'
              className='input'
              value={values.datumOdlaska}
              onChange={handleChange}
            />
            {errors.datumOdlaska != null ? (
              <FormHelperText className='helperText'>
                {errors.datumOdlaska}
              </FormHelperText>
            ) : (
              <FormHelperText className='helperTextSpacing'>
                Odabir datuma odlaska
              </FormHelperText>
            )}
            <TextField
              fullWidth='true'
              type='number'
              name='brojDana'
              variant='outlined'
              label='Broj dana'
              className='input'
              value={values.brojDana}
              onChange={handleChange}
            />
            {errors.brojDana && (
              <FormHelperText className='helperText'>
                {errors.brojDana}
              </FormHelperText>
            )}
            {items && (
              <>
                <MultiSelect
                  options={items}
                  className='input fullWidth'
                  name='zaposlenici'
                  value={selected}
                  onChange={setSelected}
                  labelledBy='Zaposlenici'
                />
                {errors.selected != null ? (
                  <FormHelperText className='helperText'>
                    {errors.selected}
                  </FormHelperText>
                ) : (
                  <FormHelperText className='helperTextSpacing'>
                    Odabir zaposlenika koji pripadaju putnom nalogu
                  </FormHelperText>
                )}
              </>
            )}
            {user.role === '1' ? (
              <FormControlLabel
                control={
                  <Switch
                    checked={odobreno}
                    onChange={handleSwitch}
                    name='checkedB'
                    color='primary'
                  />
                }
                className='input'
                label='Odobreno'
              />
            ) : (
              ''
            )}
            <Link id='redirect' to='/' />
            <Button
              id='submitButton'
              fullWidth='true'
              type='submit'
              variant='contained'
              color='primary'
              className='input'
            >
              Kreiraj putni nalog
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
