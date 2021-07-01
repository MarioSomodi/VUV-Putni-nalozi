import Topbar from './components/topbar/Topbar';
import { React, useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import PNSingle from './components/putniNalozi/Single/PNSingle';
import PNEdit from './components/putniNalozi/Edit/PNEdit';
import PNCreate from './components/putniNalozi/Create/PNCreate';
import Authentication from './components/authentication/Authentication';
import './app.css';
import PutniNalozi from './pages/PutniNalozi/PutniNalozi';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);
  function handleSuccessfulLogin(data) {
    setUser({
      username: data.username,
      token: data.token,
      role: data.role,
      tokenExpires: data.expires,
      ime: data.ime,
      prezime: data.prezime,
    });
  }
  function logOut() {
    setUser(null);
  }
  return (
    <div>
      {user == null ? (
        <div className='authContainer'>
          <Authentication Success={handleSuccessfulLogin} />
        </div>
      ) : (
        <Router>
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
            </Switch>
          </div>
        </Router>
      )}
    </div>
  );
}

export default App;
