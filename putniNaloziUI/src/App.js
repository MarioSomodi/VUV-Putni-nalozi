import Topbar from './components/topbar/Topbar';
import Sidebar from './components/sidebar/Sidebar';
import Authentication from './components/authentication/Authentication';
import './app.css';

function App() {
  return (
    <div>
      <div className='authContainer'>
        <Authentication />
      </div>
      {/* <Topbar />
      <div className='container'>
        <Sidebar />
        <div className='others'>others</div>
      </div> */}
    </div>
  );
}

export default App;
