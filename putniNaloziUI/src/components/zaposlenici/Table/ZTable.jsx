import { React, useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import 'react-confirm-alert/src/react-confirm-alert.css';
import SearchBar from 'material-ui-search-bar';
import {
  createMuiTheme,
  MuiThemeProvider,
  makeStyles,
  useTheme,
} from '@material-ui/core/styles';
import {
  Delete,
  Visibility,
  Edit,
  FirstPage,
  LastPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@material-ui/icons';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Avatar,
  TableFooter,
  TablePagination,
} from '@material-ui/core';
import './table.css';
import { Link } from 'react-router-dom';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

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

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'
      >
        {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
      >
        {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function PNTable(props) {
  const [rows, setRows] = useState();
  const [oRows, setORows] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searched, setSearched] = useState('');

  const requestSearch = (searchedVal) => {
    const filteredRows = oRows.filter((row) => {
      return `${row.ime}${row.prezime}${row.korisnickoIme}${row.odjel}${
        row.uloga
      }${row.slobodan === '1' ? 'Slobodan' : 'Nije sloboda'}`
        .toLowerCase()
        .includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched('');
    requestSearch('');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + props.user.token);

  useEffect(() => {
    updateRows();
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
  }, []);

  function handleAlert(id) {
    confirmAlert({
      title: 'Otpustiti?',
      message: 'Sigurno zelite otpustiti ovoga zaposlenika?',
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
      'http://localhost/Mario_Somodi/KV/VUV-Putni-nalozi/putniNaloziAPI/api/Zaposlenik/delete.php',
      {
        method: 'DELETE',
        mode: 'cors',
        headers: myHeaders,
        body: JSON.stringify({
          idZaposlenika: id,
        }),
      }
    )
      .then((response) => response.json())
      .then(() => updateRows());
    if (props.user.id === id) {
      window.location.reload();
    }
  }

  function updateRows() {
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
        setRows(data);
        setORows(data);
      });
  }

  return (
    <MuiThemeProvider theme={theme}>
      <Grid container>
        <Grid item xs>
          <Paper elevation={6} className='tableContainer'>
            <TableContainer>
              {rows && (
                <>
                  <SearchBar
                    className='searchBar'
                    placeholder='Pretraži'
                    value={searched}
                    onChange={(searchedVal) => requestSearch(searchedVal)}
                    onCancelSearch={() => cancelSearch()}
                  />
                  <Table aria-label='Zaposlenici tablica'>
                    <TableHead>
                      <TableRow>
                        <TableCell align='left'>R.br.</TableCell>
                        <TableCell align='center'>Profilna slika</TableCell>
                        <TableCell align='left'>Ime</TableCell>
                        <TableCell align='left'>Prezime</TableCell>
                        <TableCell align='left'>Korisnicko ime</TableCell>
                        <TableCell align='left'>Odjel</TableCell>
                        <TableCell align='left'>Uloga</TableCell>
                        <TableCell align='left'>Slobodan</TableCell>
                        <TableCell align='center'>Akcije</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(rowsPerPage > 0
                        ? rows.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : rows
                      ).map((row, index) => (
                        <TableRow>
                          <TableCell component='th' scope='row'>
                            {index + 1}
                          </TableCell>
                          <TableCell align='center' className='avatarCell'>
                            <Avatar
                              alt='Avatar'
                              src={
                                'https://eu.ui-avatars.com/api/?background=5724c7&color=fff&rounded=true&bold=true&name=' +
                                row.ime +
                                '+' +
                                row.prezime
                              }
                            />
                          </TableCell>
                          <TableCell align='left'>{row.ime}</TableCell>
                          <TableCell align='left'>{row.prezime}</TableCell>
                          <TableCell align='left'>
                            {row.korisnickoIme}
                          </TableCell>
                          <TableCell align='left'>{row.odjel}</TableCell>
                          <TableCell align='left'>{row.uloga}</TableCell>
                          <TableCell align='left'>
                            {row.slobodan === '1'
                              ? 'Slobodan'
                              : 'Nije slobodan'}
                          </TableCell>
                          <TableCell align='center'>
                            <Link to={'/Zaposlenik/id/' + row.idZaposlenika}>
                              <IconButton color='primary'>
                                <Visibility />
                              </IconButton>
                            </Link>
                            {props.user.role === '1' ? (
                              <>
                                <Link
                                  to={
                                    '/Zaposlenik/Azuriraj/id/' +
                                    row.idZaposlenika
                                  }
                                >
                                  <IconButton color='primary'>
                                    <Edit />
                                  </IconButton>
                                </Link>
                                <IconButton
                                  onClick={() => handleAlert(row.idZaposlenika)}
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
                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[
                            5,
                            10,
                            15,
                            { label: 'Svi', value: -1 },
                          ]}
                          count={rows.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          SelectProps={{
                            inputProps: { 'aria-label': 'rows per page' },
                            native: true,
                          }}
                          labelRowsPerPage='Broj redova po stranici: '
                          onChangePage={handleChangePage}
                          onChangeRowsPerPage={handleChangeRowsPerPage}
                          ActionsComponent={TablePaginationActions}
                        />
                      </TableRow>
                    </TableFooter>
                  </Table>
                </>
              )}
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
}
