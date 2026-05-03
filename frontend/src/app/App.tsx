import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { CartPage } from './components/CartPage';
import { CategoriesPage } from './components/CategoriesPage';
import { EventDetailPage } from './components/EventDetailPage';
import { AdminDashboard } from './components/AdminDashboard';
import { UserProfilePage } from './components/UserProfilePage';
import { Navbar } from './components/Navbar'; // Asegúrate de importar el Navbar aquí

// 1. Importamos los dos "cerebros" (Contextos)
import { CartProvider } from './context/CartContext'; 
import { AuthProvider } from './context/AuthContext'; 

export default function App() {
  return (
    // 2. AuthProvider envuelve a todos para manejar la sesión del usuario
    <AuthProvider>
      {/* 3. CartProvider envuelve las rutas para manejar las boletas */}
      <CartProvider>
        <BrowserRouter>
          {/* El Navbar se coloca aquí para que aparezca en todas las páginas automáticamente */}
          <Navbar />
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registro" element={<LoginPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/categorias" element={<CategoriesPage />} />
            <Route path="/evento/:id" element={<EventDetailPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/perfil" element={<UserProfilePage />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}