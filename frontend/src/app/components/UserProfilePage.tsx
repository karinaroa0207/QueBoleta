import { motion } from 'framer-motion';
import { Sparkles, Calendar, MapPin, Ticket, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

export function UserProfilePage() {
  return (
    <div className="min-h-screen bg-black pt-28 pb-12 px-4 relative overflow-hidden">
      
      {/* DECORACIÓN DE FONDO (GRADIENTES SUAVES) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7B2CFF]/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00C2FF]/10 blur-[120px] rounded-full -z-10" />

      {/* LOGO SUPERIOR */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-8 left-8 z-50"
      >
        <Link to="/" className="flex items-center gap-2 group cursor-pointer">
          <Sparkles className="text-[#7B2CFF] w-8 h-8" />
          <span className="text-2xl font-bold bg-gradient-to-r from-[#7B2CFF] to-[#00C2FF] bg-clip-text text-transparent">
            QueBoleta
          </span>
        </Link>
      </motion.div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* CABECERA DEL PERFIL */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111111] border border-gray-800 rounded-2xl p-8 mb-8 flex flex-col md:flex-row items-center gap-6 shadow-xl"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#7B2CFF] to-[#00C2FF] flex items-center justify-center text-4xl font-bold text-white shadow-[0_0_20px_rgba(123,44,255,0.4)]">
            K
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-bold text-white mb-1">Karina</h1>
            <p className="text-gray-400">karina@queboleta.com</p>
          </div>
          <div className="flex gap-3">
            <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all text-gray-400 hover:text-white">
              <Settings className="w-5 h-5" />
            </button>
            <button className="p-3 bg-red-500/10 hover:bg-red-500/20 rounded-xl border border-red-500/20 transition-all text-red-500">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* ESTADÍSTICAS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Boletas Activas', value: '3', color: '#7B2CFF', icon: Ticket },
            { label: 'Eventos Asistidos', value: '12', color: '#00C2FF', icon: Calendar },
            { label: 'Puntos QueBoleta', value: '450', color: '#FF2D95', icon: Sparkles }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#111111] border border-gray-800 p-6 rounded-2xl text-center group hover:border-gray-700 transition-all"
            >
              <stat.icon className="w-6 h-6 mx-auto mb-2 text-gray-500 group-hover:text-white transition-colors" />
              <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-white" style={{ textShadow: `0 0 10px ${stat.color}44` }}>
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* SECCIÓN DE BOLETAS */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#111111] border border-gray-800 rounded-2xl p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Ticket className="w-5 h-5 text-[#7B2CFF]" />
              Mis Próximas Boletas
            </h2>
            <span className="text-sm text-[#00C2FF] cursor-pointer hover:underline">Ver historial</span>
          </div>
          
          <div className="space-y-4">
            {/* BOLETA 1 */}
            <div className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-white/5 rounded-xl border border-white/5 hover:border-[#00C2FF]/30 transition-all group">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[#7B2CFF] to-[#00C2FF] flex items-center justify-center text-2xl">
                  🎫
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">Bad Bunny World Tour</h3>
                  <div className="flex flex-col gap-1 mt-1">
                    <span className="flex items-center gap-1 text-sm text-gray-400">
                      <Calendar className="w-3 h-3" /> 15 Mayo, 2026
                    </span>
                    <span className="flex items-center gap-1 text-sm text-gray-400">
                      <MapPin className="w-3 h-3" /> Estadio El Campín, Bogotá
                    </span>
                  </div>
                </div>
              </div>
              <button className="px-6 py-2 bg-white/10 hover:bg-[#00C2FF] text-white rounded-lg transition-all font-medium">
                Descargar QR
              </button>
            </div>

            {/* MENSAJE DE AYUDA */}
            <div className="pt-8 text-center border-t border-gray-800 mt-8">
              <p className="text-gray-500 text-sm">
                ¿Tienes problemas con tus boletas? <span className="text-[#7B2CFF] font-medium cursor-pointer hover:underline">Contactar soporte</span>
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}