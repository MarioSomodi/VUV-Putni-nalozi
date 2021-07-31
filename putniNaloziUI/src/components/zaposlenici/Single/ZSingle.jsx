import { React, useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Grid, Avatar, Button } from '@material-ui/core';
import {
  MuiThemeProvider,
  createMuiTheme,
  makeStyles,
} from '@material-ui/core/styles';
import { Today, AssignmentInd, Check, Clear, Person } from '@material-ui/icons';
import ReactToPrint from 'react-to-print';
import './single.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5724c7',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function ZSingle(props) {
  let { idZaposlenika } = useParams();
  const [zaposlenik, setZaposlenik] = useState(null);
  const [date, setDate] = useState(null);
  const componentRef = useRef();
  const classes = useStyles();

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + props.user.token);

  useEffect(() => {
    fetch(
      'http://localhost/Mario_Somodi/KV/VUV-Putni-nalozi/putniNaloziAPI/api/Zaposlenik/getSingle.php?idZaposlenika=' +
        idZaposlenika,
      {
        method: 'GET',
        mode: 'cors',
        headers: myHeaders,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setZaposlenik(data);
        setDate(new Date(data.prvaPrijava));
      });
  }, []);

  return (
    <div className='single'>
      <MuiThemeProvider theme={theme}>
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          direction='column'
        >
          <Grid item xs={6}>
            <Paper elevation={6}>
              {zaposlenik && (
                <div ref={componentRef} className='infoOfEmp'>
                  {console.log(zaposlenik)}
                  <div className='empHeader'>
                    <Avatar
                      alt='Remy Sharp'
                      src={
                        'https://eu.ui-avatars.com/api/?background=5724c7&color=fff&rounded=true&bold=true&name=' +
                        zaposlenik.ime +
                        '+' +
                        zaposlenik.prezime
                      }
                      className={classes.large}
                    />
                    <div className='empNameAndRole'>
                      <div className='name'>
                        {zaposlenik.ime} {zaposlenik.prezime}
                      </div>
                      <div className='role'>{zaposlenik.uloga}</div>
                    </div>
                  </div>
                  <div className='data'>
                    <div className='titleOfInfo'>Korisnicko ime</div>
                    <div className='contentOfInfo'>
                      <Person />
                      {zaposlenik.korisnickoIme}
                    </div>
                    <div className='titleOfInfo'>Odjel</div>
                    <div className='contentOfInfo'>
                      <AssignmentInd />
                      {zaposlenik.odjel}
                    </div>
                    <div className='titleOfInfo'>Datum prve prijave</div>
                    <div className='contentOfInfo'>
                      <Today />
                      {date &&
                        ` ${date.getFullYear()}-${
                          date.getMonth() < 10
                            ? `0${date.getMonth()}`
                            : date.getMonth()
                        }-${
                          date.getDate() < 10
                            ? `0${date.getDate()}`
                            : date.getDate()
                        }`}
                    </div>
                    <div className='titleOfInfo'>Dostupnost</div>
                    <div className='contentOfInfo'>
                      {zaposlenik.slobodan === '1' ? <Check /> : <Clear />}
                      {zaposlenik.slobodan === '1' ? 'Slobodan' : 'Zauzet'}
                    </div>
                  </div>
                </div>
              )}
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <ReactToPrint
              trigger={() => (
                <Button
                  type='button'
                  variant='contained'
                  color='primary'
                  fullWidth='true'
                  className='printButton'
                >
                  Isprintaj podatke o zaposleniku
                </Button>
              )}
              content={() => componentRef.current}
            />
          </Grid>
        </Grid>
      </MuiThemeProvider>
    </div>
  );
}
