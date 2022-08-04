import { React, useState, useEffect } from 'react';
import './edit.css';
import { useParams, Link } from 'react-router-dom';
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
import validate from './validateEditData';
import useForm from './useEditForm';
import { getApiInstance } from '../../../api/apiInstance';

export default function PNEdit({ user }) {
  const apiInstance = getApiInstance(user.token);
  const { idPutnogNaloga } = useParams();
  const [successMessage, setSuccessMessage] = useState('');
  const [selected, setSelected] = useState([]);
  const [odobreno, setOdobreno] = useState(false);
  const [items, setItems] = useState([]);
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
    idPutnogNaloga,
    Success,
    selected,
    apiInstance
  );

  const handleExistingValues = (data) => {
    values.polaziste = data.polaziste;
    values.odrediste = data.odrediste;
    values.svrha = data.svrha;
    values.datumOdlaska = data.datumOdlaska;
    values.brojDana = data.brojDana;
    values.odobreno = data.odobreno;
    setOdobreno(data.odobreno === '1');
    setUpdate(update + 1);
  };

  const handleZaposlenikChange = (data) => {
    values.zaposlenici = data;
    const list = [];
    values.zaposlenici.forEach((zaposlenik) => {
      if (zaposlenik.slobodan === '1') {
        list.push({
          label: `${zaposlenik.ime} ${zaposlenik.prezime}`,
          value: zaposlenik.idZaposlenika,
        });
      }
    });
    setItems(list);
    setUpdate(update + 1);
  };

  useEffect(() => {
    apiInstance
      .get(`PutniNalog/getSingle.php?idPutnogNaloga=${idPutnogNaloga}`)
      .then(({ data }) => {
        handleExistingValues(data);
        setSelected(
          data.zaposlenici.map((zaposlenik) => ({
            label: `${zaposlenik.ime} ${zaposlenik.prezime}`,
            value: zaposlenik.idZaposlenika,
          }))
        );
      });
    apiInstance.get('Zaposlenik/setAvailability.php');
    apiInstance.get('Zaposlenik/getAll.php').then(({ data }) => {
      handleZaposlenikChange(data);
    });
  }, []);

  const handleSwitch = () => {
    values.odobreno = !odobreno === true ? '1' : '0';
    setOdobreno(!odobreno);
  };

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
            {values.zaposlenici && (
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
              Ažuriraj putni nalog
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
