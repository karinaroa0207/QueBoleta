import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  eventId: string;
  eventName: string;
  ticketType: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Inicializamos el estado buscando si ya hay datos en el navegador
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('queboleta_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 2. Cada vez que el carrito cambie, guardamos la nueva lista automáticamente
  useEffect(() => {
    localStorage.setItem('queboleta_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
    alert("¡Agregado al carrito! 🎫");
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
};