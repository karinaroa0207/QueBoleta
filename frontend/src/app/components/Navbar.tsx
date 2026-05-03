import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, User, Menu, X, Sparkles, Search, LogOut } from 'lucide-react'; 
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext'; 
import { useAuth } from '../context/AuthContext'; 

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { cart } = useCart();
  const { isLoggedIn, logout, user } = useAuth(); 

  if (
    location.pathname === '/login' || 
    location.pathname === '/registro' || 
    location.pathname === '/perfil' ||
    location.pathname === '/admin'
  ) {
    return null;
  }

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Eventos', path: '/categorias' },
    { name: 'Próximamente', path: '/coming-soon' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#7B2CFF] to-[#00C2FF] group-hover:shadow-[0_0_20px_rgba(123,44,255,0.5)] transition-all">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#7B2CFF] to-[#00C2FF] bg-clip-text text-transparent hidden lg:block">
              QueBoleta
            </span>
          </Link>

          {/* BARRA DE BÚSQUEDA */}
          <div className="flex-1 max-w-md relative hidden md:block">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar artista, evento o ciudad"
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00C2FF] focus:border-transparent transition-all"
            />
          </div>

          {/* LINKS Y ACCIONES */}
          <div className="flex items-center gap-4 lg:gap-8">
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-[#00C2FF] ${
                    location.pathname === link.path ? 'text-[#7B2CFF]' : 'text-gray-300'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              
              {/* LA MAGIA DEL CARRITO: Solo se muestra si NO es ADMIN */}
              {user?.rol !== 'ADMIN' && (
                <Link to="/cart" className="relative p-2 text-gray-300 hover:text-white transition-colors group">
                  <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  {cart.length > 0 && (
                    <motion.span
                      key={cart.length}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-0 right-0 w-5 h-5 bg-[#FF2D95] text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-black"
                    >
                      {cart.length}
                    </motion.span>
                  )}
                </Link>
              )}

              {/* LÓGICA DE USUARIO REAL */}
              {!isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <Link 
                    to="/login"
                    className="hidden sm:block px-4 py-2 text-sm font-medium text-[#00C2FF] hover:text-[#00C2FF]/80 transition-colors"
                  >
                    Iniciar sesión
                  </Link>
                  <Link 
                    to="/registro"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#7B2CFF] to-[#9D4EFF] text-white text-sm font-bold hover:shadow-[0_0_15px_rgba(123,44,255,0.4)] transition-all"
                  >
                    Registrarse
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  {user?.rol === 'ADMIN' ? (
                    <Link 
                      to="/admin"
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF2D95] to-[#7B2CFF] text-white text-sm font-bold hover:shadow-[0_0_15px_rgba(255,45,149,0.4)] transition-all"
                    >
                      Panel Admin
                    </Link>
                  ) : (
                    <Link 
                      to="/perfil"
                      className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all group"
                      title={`Perfil de ${user?.nombre}`}
                    >
                      <User className="w-5 h-5 group-hover:text-[#00C2FF] transition-colors" />
                    </Link>
                  )}
                  
                  <button 
                    onClick={logout}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    title="Cerrar sesión"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-400 hover:text-white"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}