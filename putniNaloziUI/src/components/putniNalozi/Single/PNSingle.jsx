import { React, useState, useEffect, useRef } from 'react';
import './single.css';
import { useParams } from 'react-router-dom';
import { Paper, Grid } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ArrowRightAlt, Check, Close, Visibility } from '@material-ui/icons';
import { IconButton, Avatar, Button } from '@material-ui/core';
import ReactToPrint from 'react-to-print';
import { Link } from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5724c7',
    },
  },
});

export default function PNSingle(props) {
  let { idPutnogNaloga } = useParams();
  const [putniNalog, setPutniNalog] = useState(null);
  const componentRef = useRef();

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
      .then((data) => setPutniNalog(data));
  }, []);

  return (
    <div className='single'>
      <MuiThemeProvider theme={theme}>
        <Grid container spacing={3} ref={componentRef}>
          <Grid item xs={12}>
            <Paper className='infoContainer' elevation={6}>
              {putniNalog && (
                <>
                  <div className='info'>
                    <div className='title'>Podatci o putnom nalogu</div>
                    <hr />
                    <div className='infoItem'>
                      <div className='left'>Polazište</div>
                      <div className='right'>Odredište</div>
                    </div>
                    <div className='infoItem'>
                      <div className='left'>{putniNalog.polaziste}</div>
                      <ArrowRightAlt color='primary' />
                      <div className='right'>{putniNalog.odrediste}</div>
                    </div>
                    <div className='infoItem'>Svrha: {putniNalog.svrha}</div>
                    <div className='infoItem'>
                      Datum odlaska: {putniNalog.datumOdlaska}
                    </div>
                    <div className='infoItem'>
                      Broj dana: {putniNalog.brojDana}
                    </div>
                    <div className='infoItem'>
                      Odobreno:{' '}
                      {putniNalog.odobreno === '1' ? (
                        <Check color='primary' />
                      ) : (
                        <Close />
                      )}
                    </div>
                    <hr />
                  </div>
                </>
              )}
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className='infoContainer' elevation={6}>
              <div className='info'>
                <div className='title'>Zaposlenici putnog naloga</div>
                <hr />
                {putniNalog && putniNalog.zaposlenici[0].ime !== null
                  ? putniNalog.zaposlenici.map((zaposlenik) => (
                      <div className='zaposlenik'>
                        <div className='avatar'>
                          <Avatar
                            alt='Avatar'
                            src={
                              'https://eu.ui-avatars.com/api/?background=5724c7&color=fff&rounded=true&bold=true&name=' +
                              zaposlenik.ime +
                              '+' +
                              zaposlenik.prezime
                            }
                          />
                        </div>
                        <div className='userInfo'>
                          <span className='userName'>
                            {zaposlenik.ime + ' ' + zaposlenik.prezime}
                          </span>
                          <span className='role'>
                            {zaposlenik.odjel + ' | ' + zaposlenik.uloga}
                          </span>
                        </div>
                        <Link to={'/Zaposlenik/id/' + zaposlenik.idZaposlenika}>
                          <IconButton>
                            <Visibility color='primary' />
                          </IconButton>
                        </Link>
                      </div>
                    ))
                  : 'Ovaj putni nalog trenutno nema niti jednoga zaposlenika.'}
                <hr />
              </div>
            </Paper>
          </Grid>
        </Grid>
        <ReactToPrint
          trigger={() => (
            <Button
              type='button'
              variant='contained'
              color='primary'
              fullWidth='true'
              className='printButton'
            >
              Isprintaj podatke o putnom nalogu
            </Button>
          )}
          content={() => componentRef.current}
        />
      </MuiThemeProvider>
    </div>
  );
}
