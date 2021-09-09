import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import { React, useState, useEffect } from 'react';
import { Today, Person, Reorder } from '@material-ui/icons';
import './statistics.css';
import PNPie from './Pie';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5724c7',
    },
  },
});

export default function PNStatistics(props) {
  const [putniNalozi, setPutniNalozi] = useState();

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('authorization', 'Bearer ' + props.user.token);

  useEffect(() => {
    fetch(
      'http://localhost/Mario_Somodi/KV/VUV-Putni-nalozi/putniNaloziAPI/api/PutniNalog/getAll.php',
      {
        method: 'GET',
        mode: 'cors',
        headers: myHeaders,
      }
    )
      .then((response) => response.json())
      .then((data) => setPutniNalozi(data));
  }, []);

  return (
    <div className='statistics'>
      <MuiThemeProvider theme={theme}>
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
                        putniNalozi.reduce(
                          (x, y) => x + Number(y.brojDana),
                          0
                        ) / putniNalozi.length
                      )}{' '}
                      dana
                    </div>
                    <div className='icon'>
                      <Today />
                    </div>
                  </div>
                  <p>Prosjecno trajanje naloga</p>
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
                  <p>Prosjecan broj zaposlenika po nalogu</p>
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
      </MuiThemeProvider>
    </div>
  );
}
