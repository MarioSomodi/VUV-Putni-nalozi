import { React, useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import Grid from '@material-ui/core/Grid';
import 'react-confirm-alert/src/react-confirm-alert.css';
import SearchBar from 'material-ui-search-bar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
  TableFooter,
  TablePagination,
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
  const [rows, setRows] = useState();
  const [oRows, setORows] = useState();
  const apiInstance = getApiInstance(user.token);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searched, setSearched] = useState('');

  const requestSearch = (searchedVal) => {
    const filteredRows = oRows.filter((row) => {
      let exist = false;
      for (let i = 0; i < row.zaposlenici.length; i += 1) {
        exist = `${row.zaposlenici[i].ime}${row.zaposlenici[i].prezime}`
          .toLowerCase()
          .includes(searchedVal.toLowerCase());
        if (exist) {
          break;
        }
      }
      if (exist) {
        return exist;
      }
      return `${row.polaziste}${row.odrediste}${row.svrha}${row.datumOdlaska}${
        row.brojDana
      }${row.odobreno === '1' ? 'Odobreno' : 'Nije odobren'}`
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

  function updateRows() {
    apiInstance.get('PutniNalog/getAll.php').then(({ data }) => {
      setRows(data);
      setORows(data);
    });
  }

  function handleDelete(id) {
    apiInstance
      .delete(`PutniNalog/delete.php?id=${id}`)
      .then(() => updateRows());
  }

  useEffect(() => {
    updateRows();
    apiInstance.get('Zaposlenik/setAvailability.php');
  }, []);

  function handleAlert(id) {
    confirmAlert({
      title: 'Obrisati?',
      message: 'Sigurno želite obrisati ovaj putni nalog?',
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
            {rows && (
              <>
                <SearchBar
                  className='searchBar'
                  placeholder='Pretraži'
                  value={searched}
                  onChange={(searchedVal) => requestSearch(searchedVal)}
                  onCancelSearch={() => cancelSearch()}
                />
                <Table aria-label='Putni nalozi tablica'>
                  <TableHead>
                    <TableRow>
                      <TableCell>R.br.</TableCell>
                      <TableCell align='left'>Polazište</TableCell>
                      <TableCell align='left'>Odredište</TableCell>
                      <TableCell align='left'>Svrha</TableCell>
                      <TableCell align='left'>Datum odlaska</TableCell>
                      <TableCell align='left'>Broj dana</TableCell>
                      <TableCell align='left'>Odobreno</TableCell>
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
                        <TableCell align='left'>{row.polaziste}</TableCell>
                        <TableCell align='left'>{row.odrediste}</TableCell>
                        <TableCell align='left'>{row.svrha}</TableCell>
                        <TableCell align='left'>{row.datumOdlaska}</TableCell>
                        <TableCell align='left'>{row.brojDana}</TableCell>
                        <TableCell align='left'>
                          {row.odobreno === '1' ? 'Odobreno' : 'Nije odobreno'}
                        </TableCell>
                        <TableCell align='center'>
                          <Link to={`/PutniNalog/id/${row.idPutnogNaloga}`}>
                            <IconButton color='primary'>
                              <Visibility />
                            </IconButton>
                          </Link>
                          {user.role === '1' ? (
                            <>
                              <Link
                                to={`/PutniNalog/Azuriraj/id/${row.idPutnogNaloga}`}
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
  );
}
