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
  TableFooter,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
  const [uloge, setUloge] = useState();
  const [stateOfTable, setStateOfTable] = useState(0);
  const [odjeli, setOdjeli] = useState();
  const [oRowsUloge, setoRowsUloge] = useState();
  const [oRowsOdjeli, setoRowsOdjeli] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searched, setSearched] = useState('');

  const requestSearch = (searchedVal) => {
    const filteredRows =
      stateOfTable === 1
        ? oRowsOdjeli.filter((row) => {
            return `${row.odjel}`
              .toLowerCase()
              .includes(searchedVal.toLowerCase());
          })
        : oRowsUloge.filter((row) => {
            return `${row.uloga}`
              .toLowerCase()
              .includes(searchedVal.toLowerCase());
          });
    if (stateOfTable === 1) {
      setOdjeli(filteredRows);
    } else {
      setUloge(filteredRows);
    }
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

  const handleChange = (event) => {
    setStateOfTable(event.target.value);
  };

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('authorization', 'Bearer ' + props.user.token);
  useEffect(() => {
    updateRows();
  }, []);

  function handleAlert(id) {
    confirmAlert({
      title: 'Obrisati?',
      message:
        stateOfTable === 1
          ? 'Sigurno zelite obrisati ovaj odjel?'
          : 'Sigurno zelite obrisati ovu ulogu?',
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
    var url = '';
    if (stateOfTable === 1) {
      url =
        'http://localhost/Mario_Somodi/KV/VUV-Putni-nalozi/putniNaloziAPI/api/Odjel/delete.php';
    } else {
      url =
        'http://localhost/Mario_Somodi/KV/VUV-Putni-nalozi/putniNaloziAPI/api/Uloga/delete.php';
    }
    fetch(url, {
      method: 'DELETE',
      mode: 'cors',
      headers: myHeaders,
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => response.json())
      .then(() => updateRows());
  }

  function updateRows() {
    fetch(
      'http://localhost/Mario_Somodi/KV/VUV-Putni-nalozi/putniNaloziAPI/api/Uloga/getAll.php',
      {
        method: 'GET',
        mode: 'cors',
        headers: myHeaders,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setUloge(data);
        setoRowsUloge(data);
      });
    fetch(
      'http://localhost/Mario_Somodi/KV/VUV-Putni-nalozi/putniNaloziAPI/api/Odjel/getAll.php',
      {
        method: 'GET',
        mode: 'cors',
        headers: myHeaders,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setOdjeli(data);
        setoRowsOdjeli(data);
      });
  }

  return (
    <MuiThemeProvider theme={theme}>
      <Grid container>
        <Grid item xs>
          <Paper elevation={6} className='tableContainer'>
            <TableContainer>
              {uloge && odjeli && oRowsOdjeli && oRowsUloge && (
                <>
                  <FormControl
                    variant='outlined'
                    className='input selectData'
                    fullWidth='true'
                  >
                    <InputLabel id='labelUlogeIOdjeli'>
                      Izaberite podatke za prikazati
                    </InputLabel>
                    <Select
                      labelId='labelUlogeIOdjeli'
                      name='ulogeIOdjeli'
                      fullWidth='true'
                      value={stateOfTable}
                      onChange={handleChange}
                      label='ulogeIOdjeli'
                    >
                      <MenuItem value={1}>Odjeli</MenuItem>
                      <MenuItem value={0}>Uloge</MenuItem>
                    </Select>
                  </FormControl>
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
                        {stateOfTable && stateOfTable === 1 ? (
                          <>
                            <TableCell align='left'>Naziv odjela</TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell align='left'>Naziv uloge</TableCell>
                          </>
                        )}
                        <TableCell align='center'>Akcije</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {stateOfTable && stateOfTable === 1 ? (
                        <>
                          {(rowsPerPage > 0
                            ? odjeli.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                            : odjeli
                          ).map((row, index) => (
                            <TableRow>
                              <TableCell component='th' scope='row'>
                                {index + 1}
                              </TableCell>
                              <TableCell align='left'>{row.odjel}</TableCell>
                              <TableCell align='center'>
                                {props.user.role === '1' ? (
                                  <>
                                    <Link to={'/Odjel/Azuriraj/id/' + row.id}>
                                      <IconButton color='primary'>
                                        <Edit />
                                      </IconButton>
                                    </Link>
                                    <IconButton
                                      onClick={() => handleAlert(row.id)}
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
                        </>
                      ) : (
                        <>
                          {(rowsPerPage > 0
                            ? uloge.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                            : uloge
                          ).map((row, index) => (
                            <TableRow>
                              <TableCell component='th' scope='row'>
                                {index + 1}
                              </TableCell>
                              <TableCell align='left'>{row.uloga}</TableCell>
                              <TableCell align='center'>
                                {props.user.role === '1' ? (
                                  <>
                                    <Link to={'/Uloga/Azuriraj/id/' + row.id}>
                                      <IconButton color='primary'>
                                        <Edit />
                                      </IconButton>
                                    </Link>
                                    <IconButton
                                      onClick={() => handleAlert(row.id)}
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
                        </>
                      )}
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
                          count={
                            stateOfTable === 1 ? odjeli.length : uloge.length
                          }
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
