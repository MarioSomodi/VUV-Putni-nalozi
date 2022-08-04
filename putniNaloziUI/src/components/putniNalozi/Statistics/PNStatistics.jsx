import { Grid, Paper } from '@material-ui/core';
import { React, useState, useEffect } from 'react';
import { Today, Person, Reorder } from '@material-ui/icons';
import './statistics.css';
import PNPie from './Pie';
import { getApiInstance } from '../../../api/apiInstance';

export default function PNStatistics({ user }) {
  const [putniNalozi, setPutniNalozi] = useState();
  const apiInstance = getApiInstance(user.token);

  useEffect(() => {
    apiInstance
      .get('PutniNalog/getAll.php')
      .then(({ data }) => setPutniNalozi(data));
  }, []);

  return (
    <div className='statistics'>
      {putniNalozi && (
        <Grid container spacing={3}>
          <Grid item xs>
            <Paper className='statContainer ukNum' elevation={6}>
              <div className='content'>
                <h4>Putni nalozi</h4>
                <div className='stat'>
                  <div className='info'>{putniNalozi.length}</div>
                  <div className='icon'>
                    <Reorder />
                  </div>
                </div>
                <p>Ukupan broj putnih naloga</p>
              </div>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className='statContainer' elevation={6}>
              <div className='content'>
                <h4>Trajanje</h4>
                <div className='stat'>
                  <div className='info'>
                    {Math.round(
                      putniNalozi.reduce((x, y) => x + Number(y.brojDana), 0) /
                        putniNalozi.length
                    )}{' '}
                    dana
                  </div>
                  <div className='icon'>
                    <Today />
                  </div>
                </div>
                <p>Prosječno trajanje naloga</p>
              </div>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className='statContainer' elevation={6}>
              <div className='content'>
                <h4>Zaposlenici</h4>
                <div className='stat'>
                  <div className='info'>
                    {Math.round(
                      putniNalozi.reduce(
                        (x, y) => x + Number(y.zaposlenici.length),
                        0
                      ) / putniNalozi.length
                    )}
                  </div>
                  <div className='icon'>
                    <Person />
                  </div>
                </div>
                <p>Prosječan broj zaposlenika po nalogu</p>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className='statContainer pie' elevation={6}>
              <div className='content'>
                <h4>Odobrenje naloga</h4>
                <PNPie putniNalozi={putniNalozi} />
                <p>Usporedba odobrenih i neodobrenih putnih naloga</p>
              </div>
            </Paper>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
