import './index.css';
import Routes from './routes';

function App() {
  window.onunload = () => {
    localStorage.clear();
  }

  return (
    <Routes />
  );
}

export default App;
