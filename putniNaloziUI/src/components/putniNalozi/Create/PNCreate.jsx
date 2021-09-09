import { React, useState, useEffect } from 'react';
import './create.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MultiSelect from 'react-multi-select-component';
import useForm from './useCreateForm';
import validate from './validateCreateData';
import { Link } from 'react-router-dom';
import {
  Paper,
  Grid,
  TextField,
  FormHelperText,
  Button,
  FormControlLabel,
  Switch,
} from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5724c7',
    },
  },
});

export default function PNCreate(props) {
  const [successMessage, setSuccessMessage] = useState('');
  const [selected, setSelected] = useState([]);
  const [items, setItems] = useState([]);
  const [odobreno, setOdobreno] = useState(false);
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('authorization', 'Bearer ' + props.user.token);

  const { handleChange, values, handleSubmit, errors } = useForm(
    validate,
    Success,
    selected,
    props.user.token
  );

  useEffect(() => {
    values.odobreno = false;
    fetch(
      'http://localhost/Mario_Somodi/KV/VUV-Putni-nalozi/putniNaloziAPI/api/Zaposlenik/setAvailability.php',
      {
        method: 'GET',
        mode: 'cors',
        headers: myHeaders,
      }
    )
      .then((response) => response.text())
      .then((data) => {});
    fetch(
      'http://localhost/Mario_Somodi/KV/VUV-Putni-nalozi/putniNaloziAPI/api/Zaposlenik/getAll.php',
      {
        method: 'GET',
        mode: 'cors',
        headers: myHeaders,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setItems(
          data
            .map((zaposlenik) => {
              if (zaposlenik.slobodan === '1') {
                return {
                  label: zaposlenik.ime + ' ' + zaposlenik.prezime,
                  value: zaposlenik.idZaposlenika,
                };
              } else {
                return null;
              }
            })
            .filter((x) => !!x)
        );
      });
  }, []);

  const handleSwitch = () => {
    values.odobreno = !odobreno;
    setOdobreno(!odobreno);
  };

  function Success(message) {
    setSuccessMessage(message);
    document.getElementById('submitButton').disabled = true;
    setTimeout(() => {
      document.getElementById('redirect').click();
    }, 2000);
  }
  return (
    <div className='create'>
      <MuiThemeProvider theme={theme}>
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
              {props.user.role === '1' ? (
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
              <Link id='redirect' to='/'></Link>
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
      </MuiThemeProvider>
    </div>
  );
}
