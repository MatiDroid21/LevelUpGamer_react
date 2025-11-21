import './styles/App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Productos from './pages/productos';
import Login from './pages/login';
import PropyStates from './pages/PropyState';
import RegisterComponent from './pages/register';
import QuienesSomos from './pages/quienes';
import Noticias from './pages/blogNoticias';
import Checkout from './pages/Checkout';
import Contacto from './pages/Contacto';
import Perfil from './pages/perfil';
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import HeaderComponent from './components/HeaderComponent';
import { AuthProvider } from './context/AuthContext';
import ProtectedAdminRoute from './routes/ProtectedAdminRoute';
import AdminDashboard from './pages/AdminDashboard';
import AdminProductos from './pages/AdminProductos';
import ProductoForm from './pages/ProductoForm';
import HistorialPedidos from './pages/HistorialPedidos'

function App() {
  return (
    <AuthProvider>
      <HeaderComponent />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/productos' element={<Productos />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<RegisterComponent />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/quienes-somos' element={<QuienesSomos />} />
        <Route path='/propyState' element={<PropyStates />} />
        <Route path='/noticias' element={<Noticias />} />
        <Route path='/contacto' element={<Contacto />} />
        <Route path='/perfil' element={<Perfil />} />
        <Route path="/historial" element={<HistorialPedidos />} />

        <Route path="/admin" element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        } />

        {/* Admin Productos */}
        <Route path="/admin/productos" element={
          <ProtectedAdminRoute>
            <AdminProductos />
          </ProtectedAdminRoute>
        } />

        <Route path="/admin/productos/nuevo" element={
          <ProtectedAdminRoute>
            <ProductoForm />
          </ProtectedAdminRoute>
        } />

        <Route path="/admin/productos/editar/:id" element={
          <ProtectedAdminRoute>
            <ProductoForm />
          </ProtectedAdminRoute>
        } />
      </Routes>
    </AuthProvider>
  );
}

export default App;
