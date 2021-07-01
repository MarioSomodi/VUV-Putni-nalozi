import { React, useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import Grid from '@material-ui/core/Grid';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  makeStyles,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import { Delete, Visibility, Edit } from '@material-ui/icons';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
} from '@material-ui/core';
import './table.css';
import { Link } from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5724c7',
    },
    secondary: {
      main: '#e60505',
    },
  },
});

export default function PNTable(props) {
  const [rows, setRows] = useState();

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + props.user.token);
  useEffect(() => {
    updateRows();
  });

  function handleAlert(id) {
    confirmAlert({
      title: 'Obrisati?',
      message: 'Sigurno zelite obrisati ovaj putni nalog?',
      buttons: [
        {
          label: 'Da',
          onClick: () => handleDelete(id),
        },
        {
          label: 'Odustani',
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
    });
  }
  function handleDelete(id) {
    fetch(
      'http://localhost/Mario_Somodi/KV/VUV-Putni-nalozi/putniNaloziAPI/api/PutniNalog/delete.php',
      {
        method: 'DELETE',
        mode: 'cors',
        headers: myHeaders,
        body: JSON.stringify({
          idPutnogNaloga: id,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => updateRows());
  }

  function updateRows() {
    fetch(
      'http://localhost/Mario_Somodi/KV/VUV-Putni-nalozi/putniNaloziAPI/api/PutniNalog/getAll.php',
      {
        method: 'GET',
        mode: 'cors',
        headers: myHeaders,
      }
    )
      .then((response) => response.json())
      .then((data) => setRows(data));
  }

  return (
    <MuiThemeProvider theme={theme}>
      <Grid container>
        <Grid item xs>
          <Paper elevation={6} className='tableContainer'>
            <TableContainer>
              {rows && (
                <Table aria-label='Putni nalozi tablica'>
                  <TableHead>
                    <TableRow>
                      <TableCell>R.br.</TableCell>
                      <TableCell align='left'>Polazište</TableCell>
                      <TableCell align='left'>Odredište</TableCell>
                      <TableCell align='left'>Svrha</TableCell>
                      <TableCell align='left'>Datum odlaska</TableCell>
                      <TableCell align='left'>Broj dana</TableCell>
                      <TableCell align='left'>Zaposlenici</TableCell>
                      <TableCell align='left'>Odobreno</TableCell>
                      <TableCell align='center'>Akcije</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow>
                        <TableCell component='th' scope='row'>
                          {index + 1}
                        </TableCell>
                        <TableCell align='left'>{row.polaziste}</TableCell>
                        <TableCell align='left'>{row.odrediste}</TableCell>
                        <TableCell align='left'>{row.svrha}</TableCell>
                        <TableCell align='left'>{row.datumOdlaska}</TableCell>
                        <TableCell align='left'>{row.brojDana}</TableCell>
                        <TableCell align='left'>
                          {row.zaposlenici.length}
                        </TableCell>
                        <TableCell align='left'>
                          {row.odobreno === '1' ? 'Odobreno' : 'Nije odobreno'}
                        </TableCell>
                        <TableCell align='center'>
                          <Link to={'/PutniNalog/id/' + row.idPutnogNaloga}>
                            <IconButton color='primary'>
                              <Visibility />
                            </IconButton>
                          </Link>
                          {props.user.role === '1' ? (
                            <>
                              <Link
                                to={
                                  '/PutniNalog/Azuriraj/id/' +
                                  row.idPutnogNaloga
                                }
                              >
                                <IconButton color='primary'>
                                  <Edit />
                                </IconButton>
                              </Link>
                              <IconButton
                                onClick={() => handleAlert(row.idPutnogNaloga)}
                                color='primary'
                              >
                                <Delete />
                              </IconButton>
                            </>
                          ) : (
                            ''
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
}
