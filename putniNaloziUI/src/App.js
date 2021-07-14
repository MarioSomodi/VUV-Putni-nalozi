import Topbar from './components/topbar/Topbar';
import { React, useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import PNSingle from './components/putniNalozi/Single/PNSingle';
import PNEdit from './components/putniNalozi/Edit/PNEdit';
import PNCreate from './components/putniNalozi/Create/PNCreate';
import ZEdit from './components/zaposlenici/Edit/ZEdit';
import ZCreate from './components/zaposlenici/Create/ZCreate';
import ZStatistics from './components/zaposlenici/Statistics/ZStatistics';
import Authentication from './components/authentication/Authentication';
import './app.css';
import PutniNalozi from './pages/PutniNalozi/PutniNalozi';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PNStatistics from './components/putniNalozi/Statistics/PNStatistics';
import Zaposlenici from './pages/Zaposlenici/Zaposlenici';
import ZSingle from './components/zaposlenici/Single/ZSingle';

const history = createBrowserHistory();

function redirect() {
  history.push('/');
}

function App() {
  const [user, setUser] = useState(null);
  function handleSuccessfulLogin(data) {
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
  }
  function logOut() {
    setUser(null);
    redirect();
  }
  return (
    <div>
      {user == null ? (
        <div className='authContainer'>
          <Authentication Success={handleSuccessfulLogin} />
        </div>
      ) : (
        <Router history={history}>
          <Topbar logOut={logOut} user={user} />
          <div className='container'>
            <Sidebar user={user} />
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
            </Switch>
          </div>
        </Router>
      )}
    </div>
  );
}

export default App;
