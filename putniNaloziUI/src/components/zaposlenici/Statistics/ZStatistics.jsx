import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import { React, useState, useEffect } from 'react';
import { Person } from '@material-ui/icons';
import './statistics.css';
import Pie from './Pie';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5724c7',
    },
  },
});

export default function PNStatistics(props) {
  const [zaposlenici, setZaposlenici] = useState();

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + props.user.token);

  useEffect(() => {
    fetch(
      'http://localhost/Mario_Somodi/KV/VUV-Putni-nalozi/putniNaloziAPI/api/Zaposlenik/getAll.php',
      {
        method: 'GET',
        mode: 'cors',
        headers: myHeaders,
      }
    )
      .then((response) => response.json())
      .then((data) => setZaposlenici(data));
  }, []);

  return (
    <div className='statistics'>
      <MuiThemeProvider theme={theme}>
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
      </MuiThemeProvider>
    </div>
  );
}
