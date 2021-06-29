import Topbar from './components/topbar/Topbar';
import { React, useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Authentication from './components/authentication/Authentication';
import './app.css';

function App() {
  const [user, setUser] = useState(null);
  function handleSuccessfulLogin(data) {
    setUser({
      username: data.username,
      token: data.token,
      role: data.role,
      tokenExpires: data.expires,
    });
  }

  return (
    <div>
      {user == null ? (
        <div className='authContainer'>
          <Authentication Success={handleSuccessfulLogin} />
        </div>
      ) : (
        <div>
          <Topbar />
          <div className='container'>
            <Sidebar />
            <div className='others'>others</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
