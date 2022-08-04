import { React, useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import Grid from '@material-ui/core/Grid';
import 'react-confirm-alert/src/react-confirm-alert.css';
import SearchBar from 'material-ui-search-bar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
import { getApiInstance } from '../../../api/apiInstance';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

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

export default function PNTable({ user }) {
  const apiInstance = getApiInstance(user.token);
  const [uloge, setUloge] = useState();
  const [stateOfTable, setStateOfTable] = useState(0);
  const [odjeli, setOdjeli] = useState();
  const [rowsUloge, setRowsUloge] = useState();
  const [rowsOdjeli, setRowsOdjeli] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searched, setSearched] = useState('');

  const requestSearch = (searchedVal) => {
    const filteredRows =
      stateOfTable === 1
        ? rowsOdjeli.filter((row) =>
            `${row.odjel}`.toLowerCase().includes(searchedVal.toLowerCase())
          )
        : rowsUloge.filter((row) =>
            `${row.uloga}`.toLowerCase().includes(searchedVal.toLowerCase())
          );
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

  function updateRows() {
    apiInstance.get('Uloga/getAll.php').then(({ data }) => {
      setUloge(data);
      setRowsUloge(data);
    });
    apiInstance.get('Odjel/getAll.php').then(({ data }) => {
      setOdjeli(data);
      setRowsOdjeli(data);
    });
  }

  function handleDelete(id) {
    let url = '';
    if (stateOfTable === 1) {
      url = 'Odjel/delete.php';
    } else {
      url = 'Uloga/delete.php';
    }
    apiInstance.delete(`${url}?id=${id}`).then(() => updateRows());
  }

  useEffect(() => {
    updateRows();
  }, []);

  function handleAlert(id) {
    confirmAlert({
      title: 'Obrisati?',
      message:
        stateOfTable === 1
          ? 'Sigurno želite obrisati ovaj odjel?'
          : 'Sigurno želite obrisati ovu ulogu?',
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

  return (
    <Grid container>
      <Grid item xs>
        <Paper elevation={6} className='tableContainer'>
          <TableContainer>
            {uloge && odjeli && rowsOdjeli && rowsUloge && (
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
                        <TableCell align='left'>Naziv odjela</TableCell>
                      ) : (
                        <TableCell align='left'>Naziv uloge</TableCell>
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
                              {user.role === '1' ? (
                                <>
                                  <Link to={`/Odjel/Azuriraj/id/${row.id}`}>
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
                              {user.role === '1' ? (
                                <>
                                  <Link to={`/Uloga/Azuriraj/id/${row.id}`}>
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
  );
}
