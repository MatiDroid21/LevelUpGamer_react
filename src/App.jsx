import './styles/App.css';
import { Routes, Route} from 'react-router-dom';
import Home from './pages/home';
import Productos from './pages/productos';
import Login from './pages/login';
import PropyStates from './pages/PropyState';
import RegisterComponent from './pages/register';
import QuienesSomos from './pages/quienes';
import Noticias from './pages/blogNoticias';
import Checkout from './pages/Checkout';
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import HeaderComponent from './components/HeaderComponent';
function App() {
  return (
    <>
    <HeaderComponent />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/productos' element={<Productos />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={< RegisterComponent/>} />
      <Route path='/checkout' element={<Checkout />} />
      <Route path='/quienes-somos' element={<QuienesSomos />} />  
      <Route path='/propyState' element={<PropyStates />} />
      <Route path='/noticias' element={<Noticias />} /> 

    </Routes>
    </>
  );
}

export default App;
