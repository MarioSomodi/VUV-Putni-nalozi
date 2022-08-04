import { Grid, Paper } from '@material-ui/core';
import { React, useState, useEffect } from 'react';
import { Person } from '@material-ui/icons';
import './statistics.css';
import Pie from './Pie';
import { getApiInstance } from '../../../api/apiInstance';

export default function PNStatistics({ user }) {
  const [zaposlenici, setZaposlenici] = useState();
  const apiInstance = getApiInstance(user.token);

  useEffect(() => {
    apiInstance
      .get('Zaposlenik/getAll.php')
      .then(({ data }) => setZaposlenici(data));
  }, []);

  return (
    <div className='statistics'>
      {zaposlenici && (
        <Grid container spacing={3}>
          <Grid item xs>
            <Paper
              className='statContainer centerContainer ukNum'
              elevation={6}
            >
              <div className='content'>
                <h4>Zaposlenici</h4>
                <div className='stat'>
                  <div className='info'>{zaposlenici.length}</div>
                  <div className='icon'>
                    <Person />
                  </div>
                </div>
                <p>Ukupan broj zaposlenih</p>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className='statContainer pie' elevation={6}>
              <div className='content'>
                <h4>Slobodni zaposlenici</h4>
                {zaposlenici && <Pie zaposlenici={zaposlenici} />}
                <p>Usporedba slobodnih i zauzetih zaposlenika</p>
              </div>
            </Paper>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
