import { React, useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Grid, Avatar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Today, AssignmentInd, Check, Clear, Person } from '@material-ui/icons';
import ReactToPrint from 'react-to-print';
import './single.css';
import { getApiInstance } from '../../../api/apiInstance';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function ZSingle({ user }) {
  const { idZaposlenika } = useParams();
  const [zaposlenik, setZaposlenik] = useState(null);
  const [date, setDate] = useState(null);
  const componentRef = useRef();
  const classes = useStyles();
  const apiInstance = getApiInstance(user.token);

  useEffect(() => {
    apiInstance
      .get(`Zaposlenik/getSingle.php?idZaposlenika=${idZaposlenika}`)
      .then(({ data }) => {
        setZaposlenik(data);
        setDate(new Date(data.prvaPrijava));
      });
  }, []);

  return (
    <div className='single'>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        direction='column'
      >
        <Grid item xs={12}>
          <Paper elevation={6}>
            {zaposlenik && (
              <div ref={componentRef} className='infoOfEmp'>
                <div className='empHeader'>
                  <Avatar
                    alt='Users avatar'
                    src={`https://eu.ui-avatars.com/api/?background=5724c7&color=fff&rounded=true&bold=true&name=${zaposlenik.ime}+${zaposlenik.prezime}`}
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
                  <div className='titleOfInfo'>Korisničko ime</div>
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
        <Grid item xs={12}>
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
                Isprintaj podatke o zaposleniku
              </Button>
            )}
            content={() => componentRef.current}
          />
        </Grid>
      </Grid>
    </div>
  );
}
