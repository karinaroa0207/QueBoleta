import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import {
  ArrowLeft, Calendar, MapPin, Clock, Users, Ticket, 
  Plus, Minus, Heart, Share2, Star, Settings // <-- Agregué Settings aquí
} from 'lucide-react';

interface TicketType {
  id: string;
  name: string;
  price: number;
  available: number;
  description: string;
}

interface EventDetail {
  id: string;
  name: string;
  artist: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  image: string;
  bannerImage: string;
  description: string;
  category: string;
  ticketTypes: TicketType[];
  rating: number;
  totalReviews: number;
}

export function EventDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [event, setEvent] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const isAdmin = user?.rol === 'ADMIN';

  const [selectedTicketType, setSelectedTicketType] = useState<TicketType | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/api/eventos/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Evento no encontrado");
        return res.json();
      })
      .then(data => {
        const eventoMapeado: EventDetail = {
          id: data.id.toString(),
          name: data.nombre,
          artist: data.nombre,
          date: data.fecha,
          time: '20:00',
          location: data.ciudad,
          venue: data.ciudad,
          image: data.imagenUrl,
          bannerImage: data.imagenUrl,
          // 1. CONECTAMOS LA DESCRIPCIÓN REAL (o ponemos una por defecto si está vacía)
          description: data.descripcion || `Disfruta de este increíble evento en ${data.ciudad}. Una experiencia visual y musical única.`,
          category: data.categoria?.nombre || 'Conciertos',
          ticketTypes: [
            {
              id: 'general',
              name: 'Entrada General',
              price: data.precio,
              // 2. CONECTAMOS EL AFORO/CAPACIDAD REAL DE LA BASE DE DATOS
              available: data.capacidad || 5000, 
              description: 'Acceso general al evento'
            }
          ],
          rating: 4.9,
          totalReviews: 1250
        };

        setEvent(eventoMapeado);
        setSelectedTicketType(eventoMapeado.ticketTypes[0]);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleQuantityChange = (delta: number) => {
    if (!selectedTicketType) return;
    const newQuantity = Math.max(1, Math.min(selectedTicketType.available, quantity + delta));
    setQuantity(newQuantity);
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-[#00C2FF] font-bold">Cargando experiencia...</div>;
  if (!event || !selectedTicketType) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Evento no encontrado.</div>;

  const totalPrice = selectedTicketType.price * quantity;

  return (
    <div className="min-h-screen bg-[#000000]">
      {/* Hero Banner */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img
          src={event.bannerImage}
          alt={event.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30"></div>

        {/* Back Button */}
        <Link
          to="/"
          className="absolute top-6 left-6 z-20 p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-black/80 hover:border-[#7B2CFF] transition-all group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </Link>

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 z-20 flex gap-3">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-black/80 hover:border-[#FF2D95] transition-all"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-[#FF2D95] text-[#FF2D95]' : ''}`} />
          </button>
          <button className="p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-black/80 hover:border-[#00C2FF] transition-all">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Event Title */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-block px-3 py-1 rounded-full bg-[#7B2CFF]/20 border border-[#7B2CFF]/50 backdrop-blur-md text-[#7B2CFF] text-sm font-semibold mb-3">
                {event.category}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
                {event.artist}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300">
                {event.name}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Event Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Info Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-[#111111] rounded-2xl p-5 border border-gray-800"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[#7B2CFF]/10">
                    <Calendar className="w-5 h-5 text-[#7B2CFF]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Fecha</p>
                    <p className="text-white font-semibold">{event.date}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="bg-[#111111] rounded-2xl p-5 border border-gray-800"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[#00C2FF]/10">
                    <Clock className="w-5 h-5 text-[#00C2FF]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Hora</p>
                    <p className="text-white font-semibold">{event.time}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-[#111111] rounded-2xl p-5 border border-gray-800 sm:col-span-2"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[#FF2D95]/10">
                    <MapPin className="w-5 h-5 text-[#FF2D95]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Ubicación</p>
                    <p className="text-white font-semibold">{event.venue}</p>
                    <p className="text-gray-400 text-sm">{event.location}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* 3. SECCIÓN "SOBRE EL EVENTO" ACTUALIZADA CON AFORO REAL */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="bg-[#111111] rounded-2xl p-6 border border-gray-800"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Sobre el evento</h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {event.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 border-t border-gray-800/80 pt-6 mt-6">
                
                {/* Nuevo: Módulo de Asientos */}
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#00C2FF]/10 rounded-lg">
                    <Users className="w-5 h-5 text-[#00C2FF]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Aforo / Asientos</p>
                    <p className="text-sm text-gray-300">
                      <strong className="text-white text-base">
                        {event.ticketTypes[0].available.toLocaleString('es-CO')}
                      </strong> disponibles
                    </p>
                  </div>
                </div>

                {/* Reseñas (Se mantiene igual a tu diseño) */}
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#FFD166]/10 rounded-lg">
                    <Star className="w-5 h-5 text-[#FFD166]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Calificación</p>
                    <p className="text-sm text-gray-300">
                      <strong className="text-white text-base">{event.rating}</strong> ({event.totalReviews.toLocaleString()} reseñas)
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

          {/* Right Column - Ticket Selection / Admin Preview */}
          <div className="lg:col-span-1">
            {isAdmin ? (
              // ==========================================
              // VISTA PARA EL ADMINISTRADOR (Solo lectura)
              // ==========================================
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-[#111111] rounded-2xl p-6 border border-[#FF2D95]/30 sticky top-28 shadow-[0_0_40px_rgba(255,45,149,0.15)]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-[#FF2D95]/20 rounded-xl text-[#FF2D95]">
                    <Settings className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Modo Administrador</h2>
                </div>
                <p className="text-gray-400 mb-6 text-sm">
                  Estás viendo la vista previa de este evento. Los clientes verán aquí las opciones para seleccionar el tipo de boleta, la cantidad y el botón para agregar al carrito.
                </p>
                
                <Link to="/admin">
                  <button className="w-full py-4 rounded-xl font-bold text-white text-lg relative overflow-hidden group transition-all"
                    style={{ background: 'linear-gradient(135deg, #FF2D95 0%, #7B2CFF 100%)' }}
                  >
                    Volver al Panel de Control
                  </button>
                </Link>
              </motion.div>
            ) : (
              // ==========================================
              // VISTA NORMAL PARA CLIENTES (Con carrito)
              // ==========================================
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-[#111111] rounded-2xl p-6 border border-[#7B2CFF]/30 sticky top-28 shadow-[0_0_40px_rgba(123,44,255,0.15)]"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Selecciona tus boletas</h2>

                {/* Ticket Type Selection */}
                <div className="space-y-3 mb-6">
                  {event.ticketTypes.map((ticketType) => (
                    <button
                      key={ticketType.id}
                      onClick={() => {
                        setSelectedTicketType(ticketType);
                        setQuantity(1);
                      }}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                        selectedTicketType.id === ticketType.id
                          ? 'border-[#7B2CFF] bg-[#7B2CFF]/10'
                          : 'border-gray-800 hover:border-gray-700'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-white font-semibold mb-1">{ticketType.name}</h3>
                          <p className="text-gray-400 text-sm">{ticketType.description}</p>
                        </div>
                        <div className="ml-3">
                          <Ticket className={`w-5 h-5 ${selectedTicketType.id === ticketType.id ? 'text-[#7B2CFF]' : 'text-gray-600'}`} />
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xl font-bold bg-gradient-to-r from-[#7B2CFF] to-[#00C2FF] bg-clip-text text-transparent">
                          ${ticketType.price.toLocaleString('es-CO')}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-white font-semibold mb-3">Cantidad</label>
                  <div className="flex items-center justify-between bg-[#1a1a1a] rounded-xl p-2 border border-gray-800">
                    <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1} className="p-3 hover:bg-[#7B2CFF]/20 rounded-lg text-gray-300 hover:text-[#7B2CFF] transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="text-2xl font-bold text-white">{quantity}</span>
                    <button onClick={() => handleQuantityChange(1)} disabled={quantity >= selectedTicketType.available} className="p-3 hover:bg-[#00C2FF]/20 rounded-lg text-gray-300 hover:text-[#00C2FF] transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="space-y-3 mb-6 p-4 bg-[#0a0a0a] rounded-xl border border-gray-800/50">
                  <div className="flex justify-between text-gray-400 text-sm">
                    <span>Precio unitario</span>
                    <span className="font-semibold text-gray-300">${selectedTicketType.price.toLocaleString('es-CO')}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 text-sm">
                    <span>Cantidad</span>
                    <span className="font-semibold text-gray-300">× {quantity}</span>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-2"></div>
                  <div className="flex justify-between text-xl font-bold">
                    <span className="text-white">Total</span>
                    <span className="bg-gradient-to-r from-[#7B2CFF] to-[#00C2FF] bg-clip-text text-transparent">
                      ${totalPrice.toLocaleString('es-CO')}
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    addToCart({
                      eventId: event.id,
                      eventName: event.artist,
                      ticketType: selectedTicketType.name,
                      price: selectedTicketType.price,
                      quantity: quantity,
                      image: event.image
                    });
                    alert("🛒 ¡Boletas agregadas al carrito exitosamente!");
                  }}
                  className="w-full py-4 rounded-xl font-bold text-white text-lg relative overflow-hidden group mb-4 shadow-[0_10px_30px_rgba(123,44,255,0.4)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#7B2CFF] to-[#00C2FF] transition-all duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00C2FF] to-[#7B2CFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Comprar Entradas
                  </span>
                </motion.button>

                {/* Security Info */}
                <div className="text-center text-xs text-gray-500 space-y-1 mt-4">
                  <p className="flex items-center justify-center gap-1">
                    <span className="text-[#00C2FF]">🔒</span> Compra 100% segura
                  </p>
                  <p>Tus datos están encriptados y protegidos</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}