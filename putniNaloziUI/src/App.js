import { React, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import clsx from 'clsx';
import { createBrowserHistory } from 'history';
import './components/Topbar/topbar.css';
import {
  createMuiTheme,
  MuiThemeProvider,
  useTheme,
  makeStyles,
} from '@material-ui/core/styles';
import {
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
} from '@material-ui/core';
import {
  Menu,
  ChevronLeft,
  ChevronRight,
  Settings,
  ExitToApp,
} from '@material-ui/icons';
import PNSingle from './components/putniNalozi/Single/PNSingle';
import PNEdit from './components/putniNalozi/Edit/PNEdit';
import PNCreate from './components/putniNalozi/Create/PNCreate';
import ZEdit from './components/zaposlenici/Edit/ZEdit';
import ZCreate from './components/zaposlenici/Create/ZCreate';
import ZStatistics from './components/zaposlenici/Statistics/ZStatistics';
import Authentication from './components/authentication/Authentication';
import './App.css';
import PutniNalozi from './pages/PutniNalozi/PutniNalozi';
import PNStatistics from './components/putniNalozi/Statistics/PNStatistics';
import Zaposlenici from './pages/Zaposlenici/Zaposlenici';
import ZSingle from './components/zaposlenici/Single/ZSingle';
import OdjeliIUloge from './pages/OdjeliIUloge/OdjeliIUloge';
import EditOdjel from './components/odjeliIUloge/Edit/EditOdjel';
import EditUloga from './components/odjeliIUloge/Edit/EditUloga';
import OUCreate from './components/odjeliIUloge/Create/OUCreate';
import subNavTitlesAndTheirItems from './components/sidebar/sidebarItems';
import SidebarMenu from './components/sidebar/SidebarMenu';

const drawerWidth = 240;
const history = createBrowserHistory();

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  large: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginRight: '0',
    marginTop: '0',
  },
  iconButton: {
    padding: 5,
    marginRight: 5,
    alignItems: 'center',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    display: 'flex',
    flexGrow: 1,
    marginTop: theme.spacing(8),
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: theme.spacing(8),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function redirect() {
  history.push('/');
}

function App() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const customTheme = createMuiTheme({
    palette: {
      primary: {
        main: '#5724c7',
      },
      secondary: {
        main: '#fff',
      },
    },
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSuccessfulLogin = (data) => {
    setUser({
      username: data.username,
      token: data.token,
      id: data.id,
      role: data.role,
      tokenExpires: data.expires,
      ime: data.ime,
      prezime: data.prezime,
    });
    redirect();
  };

  const logOut = () => {
    setUser(null);
    redirect();
  };

  return (
    <MuiThemeProvider theme={customTheme}>
      <Router>
        {user == null ? (
          <div className='authContainer'>
            <Authentication Success={handleSuccessfulLogin} />
          </div>
        ) : (
          <div className={classes.root}>
            <AppBar
              color='secondary'
              position='fixed'
              className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
              })}
            >
              <Toolbar
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <IconButton
                  color='inherit'
                  aria-label='open drawer'
                  onClick={handleDrawerOpen}
                  edge='start'
                  className={clsx(classes.menuButton, open && classes.hide)}
                >
                  <Menu />
                </IconButton>
                <span className='logo'>
                  <Link className='link' to='/'>
                    VUVPutniNalozi
                  </Link>
                </span>
                <div
                  style={{
                    marginRight: 10,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <IconButton
                    className={classes.iconButton}
                    aria-label='Postavke'
                  >
                    <Link
                      className='linkSetting'
                      to={`/Zaposlenik/Azuriraj/id/${user.id}`}
                    >
                      <Settings />
                    </Link>
                  </IconButton>
                  <IconButton
                    onClick={logOut}
                    className={classes.iconButton}
                    aria-label='Odjavi se'
                  >
                    <ExitToApp />
                  </IconButton>
                  <Avatar
                    alt='Avatar'
                    src={`https://eu.ui-avatars.com/api/?background=5724c7&color=fff&rounded=true&bold=true&name=${user.ime}+${user.prezime}`}
                    className={classes.large}
                  />
                </div>
              </Toolbar>
            </AppBar>
            <Drawer
              className={classes.drawer}
              variant='persistent'
              anchor='left'
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'ltr' ? (
                    <ChevronLeft />
                  ) : (
                    <ChevronRight />
                  )}
                </IconButton>
              </div>
              {user.role === '1'
                ? subNavTitlesAndTheirItems.map((titleAndItems) => (
                    <SidebarMenu
                      title={titleAndItems.title}
                      items={titleAndItems.items}
                    />
                  ))
                : subNavTitlesAndTheirItems
                    .filter((x) => x.role === 0)
                    .map((titleAndItems) => (
                      <SidebarMenu
                        title={titleAndItems.title}
                        items={titleAndItems.items}
                      />
                    ))}
            </Drawer>
            <div className={open ? classes.contentShift : classes.content}>
              <Switch>
                <Route path='/' exact>
                  <PutniNalozi user={user} />
                </Route>
                <Route path='/PutniNalog/id/:idPutnogNaloga' exact>
                  <PNSingle user={user} />
                </Route>
                <Route path='/PutniNalog/Novi' exact>
                  <PNCreate user={user} />
                </Route>
                <Route path='/PutniNalog/Azuriraj/id/:idPutnogNaloga' exact>
                  <PNEdit user={user} />
                </Route>
                <Route path='/PutniNalog/Statistika' exact>
                  <PNStatistics user={user} />
                </Route>
                <Route path='/Zaposlenici' exact>
                  <Zaposlenici user={user} />
                </Route>
                <Route path='/Zaposlenik/id/:idZaposlenika' exact>
                  <ZSingle user={user} />
                </Route>
                <Route path='/Zaposlenik/Azuriraj/id/:idZaposlenika' exact>
                  <ZEdit user={user} />
                </Route>
                <Route path='/Zaposlenik/Novi' exact>
                  <ZCreate user={user} />
                </Route>
                <Route path='/Zaposlenik/Statistika' exact>
                  <ZStatistics user={user} />
                </Route>
                <Route path='/Odjeli-i-Uloge' exact>
                  <OdjeliIUloge user={user} />
                </Route>
                <Route path='/Odjel/Azuriraj/id/:idOdjela' exact>
                  <EditOdjel user={user} />
                </Route>
                <Route path='/Uloga/Azuriraj/id/:idUloge' exact>
                  <EditUloga user={user} />
                </Route>
                <Route path='/Odjel-i-Uloga/Kreiraj' exact>
                  <OUCreate user={user} />
                </Route>
              </Switch>
            </div>
          </div>
        )}
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
