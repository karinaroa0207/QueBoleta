import React, { createContext, useContext, useState } from 'react';

interface UserData {
  id?: number;
  nombre: string;
  email: string;
  rol: string;
}

interface AuthContextType {
  user: UserData | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<string | false>;
  register: (nombre: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Usamos sessionStorage para que olvide al usuario al cerrar la pestaña
  const [user, setUser] = useState<UserData | null>(() => {
    const savedUser = sessionStorage.getItem('queboleta_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isLoggedIn = !!user;

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:8080/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        
        // 2. Guardamos la sesión solo de forma temporal
        sessionStorage.setItem('queboleta_user', JSON.stringify(userData));
        
        return userData.rol; 
      }
      return false; 
    } catch (error) {
      console.error("No se pudo conectar con Java:", error);
      alert("Error de conexión. Revisa que tu backend en Java esté corriendo.");
      return false;
    }
  };

  const register = async (nombre: string, email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:8080/api/usuarios/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, password, rol: 'CLIENTE' })
      });
      return response.ok;
    } catch (error) {
      console.error("No se pudo conectar con Java:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    // 3. Borramos el dato temporal al salir
    sessionStorage.removeItem('queboleta_user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};