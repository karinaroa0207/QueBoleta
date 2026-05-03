import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Sparkles, Theater, Trophy, Calendar, MapPin, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

type Category = 'Todos' | 'Conciertos' | 'Festivales' | 'Teatro' | 'Deportes';

const categories: Category[] = ['Todos', 'Conciertos', 'Festivales', 'Teatro', 'Deportes'];

const categoryIcons: Record<Category, any> = {
  'Todos': Sparkles,
  'Conciertos': Music,
  'Festivales': Sparkles,
  'Teatro': Theater,
  'Deportes': Trophy,
};

export function CategoriesPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('Todos');
  const [dbEvents, setDbEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Llamamos a Java para traer los eventos de PostgreSQL
  useEffect(() => {
    fetch('http://localhost:8080/api/eventos')
      .then(res => res.json())
      .then(data => {
        setDbEvents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error conectando a Java:", err);
        setLoading(false);
      });
  }, []);

  // 2. Filtramos usando la Llave Foránea de Java (event.categoria.nombre)
  const filteredEvents = activeCategory === 'Todos'
    ? dbEvents
    : dbEvents.filter(event => event.categoria?.nombre === activeCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center">
        <p className="text-[#00C2FF] text-xl font-bold animate-pulse">Cargando categorías...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000000] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 -left-32 w-[500px] h-[500px] bg-[#7B2CFF] rounded-full blur-[150px] opacity-10"></div>
        <div className="absolute bottom-40 -right-32 w-[500px] h-[500px] bg-[#00C2FF] rounded-full blur-[150px] opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00C2FF] transition-colors mb-6 group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Volver al inicio
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-3">
            <span className="bg-gradient-to-r from-[#7B2CFF] via-[#9D4EFF] to-[#00C2FF] bg-clip-text text-transparent">
              Explorar Categorías
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Descubre eventos increíbles organizados por tipo
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const Icon = categoryIcons[category];
              const isActive = activeCategory === category;

              return (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category)}
                  className={`
                    px-6 py-3 rounded-full font-semibold text-base
                    flex items-center gap-2 transition-all duration-300
                    ${isActive
                      ? 'text-white shadow-[0_0_30px_rgba(123,44,255,0.5)]'
                      : 'text-gray-300 bg-[#1a1a1a] border border-gray-800 hover:border-[#7B2CFF]/50'
                    }
                  `}
                  style={isActive ? {
                    background: 'linear-gradient(135deg, #7B2CFF 0%, #00C2FF 100%)',
                  } : {}}
                >
                  <Icon className="w-5 h-5" />
                  {category}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Events Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-gray-400">
            {filteredEvents.length} {filteredEvents.length === 1 ? 'evento encontrado' : 'eventos encontrados'}
          </p>
        </motion.div>

        {/* Events Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredEvents.map((event, index) => (
              <Link to={`/evento/${event.id}`} key={event.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="group cursor-pointer"
                >
                  <div className="bg-[#111111] rounded-2xl overflow-hidden border border-gray-800 hover:border-[#7B2CFF]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(123,44,255,0.2)]">
                  {/* Event Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.imagenUrl}
                      alt={event.nombre}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-black/50 text-white border border-white/20">
                      {event.categoria?.nombre || 'General'}
                    </div>

                    {/* Price Tag */}
                    <div className="absolute bottom-3 right-3">
                      {event.precio === 0 ? (
                        <div className="px-3 py-1 rounded-lg backdrop-blur-md bg-[#00C2FF]/20 border border-[#00C2FF]/50">
                          <span className="text-sm font-bold text-[#00C2FF]">GRATIS</span>
                        </div>
                      ) : (
                        <div className="px-3 py-1 rounded-lg backdrop-blur-md bg-black/60 border border-white/20">
                          <span className="text-sm font-bold text-white">
                            ${event.precio.toLocaleString('es-CO')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Event Info */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-[#00C2FF] transition-colors">
                      {event.nombre}
                    </h3>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar className="w-4 h-4 text-[#7B2CFF]" />
                        {event.fecha}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <MapPin className="w-4 h-4 text-[#00C2FF]" />
                        <span className="line-clamp-1">{event.ciudad}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button className="w-full mt-4 py-2.5 rounded-xl bg-[#1a1a1a] text-white font-semibold border border-gray-800 hover:border-[#7B2CFF] hover:bg-[#7B2CFF]/10 hover:text-[#7B2CFF] transition-all duration-300">
                      Ver detalles
                    </button>
                  </div>
                </div>
              </motion.div>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-[#1a1a1a] rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-300 mb-2">No hay eventos en esta categoría</h3>
            <p className="text-gray-500 mb-6">Prueba seleccionando otra categoría</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}