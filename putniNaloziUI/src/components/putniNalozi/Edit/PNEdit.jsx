import { React, useState, useEffect } from 'react';
import './edit.css';
import { useParams } from 'react-router-dom';
import useForm from './useEditForm';
import validate from './validateEditData';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
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
import { Link } from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5724c7',
    },
  },
});

export default function PNEdit(props) {
  let { idPutnogNaloga } = useParams();
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

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('authorization', 'Bearer ' + props.user.token);

  useEffect(() => {
    fetch(
      'http://localhost/Mario_Somodi/KV/VUV-Putni-nalozi/putniNaloziAPI/api/PutniNalog/getSingle.php?idPutnogNaloga=' +
        idPutnogNaloga,
      {
        method: 'GET',
        mode: 'cors',
        headers: myHeaders,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        handleExistingValues(data);
        setSelected(
          data.zaposlenici.map((zaposlenik) => {
            return {
              label: zaposlenik.ime + ' ' + zaposlenik.prezime,
              value: zaposlenik.idZaposlenika,
            };
          })
        );
      });
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
        handleZaposlenikChange(data);
      });
  }, []);

  const { handleChange, values, handleSubmit, errors } = useForm(
    validate,
    idPutnogNaloga,
    Success,
    selected,
    props.user.token
  );

  const handleExistingValues = (data) => {
    values.polaziste = data.polaziste;
    values.odrediste = data.odrediste;
    values.svrha = data.svrha;
    values.datumOdlaska = data.datumOdlaska;
    values.brojDana = data.brojDana;
    values.odobreno = data.odobreno;
    setOdobreno(data.odobreno === '1' ? true : false);
    setUpdate(update + 1);
  };

  const handleZaposlenikChange = (data) => {
    values.zaposlenici = data;
    var list = [];
    values.zaposlenici.map((zaposlenik) => {
      if (zaposlenik.slobodan === '1') {
        list.push({
          label: zaposlenik.ime + ' ' + zaposlenik.prezime,
          value: zaposlenik.idZaposlenika,
        });
      }
    });
    setItems(list);
    setUpdate(update + 1);
  };

  const handleSwitch = () => {
    values.odobreno = !odobreno === true ? '1' : '0';
    setOdobreno(!odobreno);
  };

  return (
    <div className='edit'>
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
                    label='Polazi??te'
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
                    label='Odredi??te'
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
                Azuriraj putni nalog
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
