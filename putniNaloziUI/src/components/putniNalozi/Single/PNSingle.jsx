import { React, useState, useEffect, useRef } from 'react';
import './single.css';
import { useParams, Link } from 'react-router-dom';
import { Paper, Grid, IconButton, Avatar, Button } from '@material-ui/core';
import { ArrowRightAlt, Check, Close, Visibility } from '@material-ui/icons';
import ReactToPrint from 'react-to-print';
import { getApiInstance } from '../../../api/apiInstance';

export default function PNSingle({ user }) {
  const apiInstance = getApiInstance(user.token);
  const { idPutnogNaloga } = useParams();
  const [putniNalog, setPutniNalog] = useState(null);
  const componentRef = useRef();

  useEffect(() => {
    apiInstance
      .get(`PutniNalog/getSingle.php?idPutnogNaloga=${idPutnogNaloga}`)
      .then(({ data }) => setPutniNalog(data));
  }, []);

  return (
    <div className='single'>
      <Grid container spacing={3} ref={componentRef}>
        <Grid item xs={12}>
          <Paper className='infoContainer' elevation={6}>
            {putniNalog && (
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
                <div className='infoItem'>Broj dana: {putniNalog.brojDana}</div>
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
                          src={`https://eu.ui-avatars.com/api/?background=5724c7&color=fff&rounded=true&bold=true&name=${zaposlenik.ime}+${zaposlenik.prezime}`}
                        />
                      </div>
                      <div className='userInfo'>
                        <span className='userName'>
                          {`${zaposlenik.ime} ${zaposlenik.prezime}`}
                        </span>
                        <span className='role'>
                          {`${zaposlenik.odjel} | ${zaposlenik.uloga}`}
                        </span>
                      </div>
                      <Link to={`/Zaposlenik/id/${zaposlenik.idZaposlenika}`}>
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
        // eslint-disable-next-line react/no-unstable-nested-components
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
    </div>
  );
}
