import { useState, useEffect } from 'react';
import { EventCard } from './EventCard';

export function FeaturedEvents() {
  // 1. Creamos una variable de estado para guardar los eventos que lleguen de Java
  const [eventos, setEventos] = useState([]);

  // 2. Usamos useEffect para que "llame al mesero" justo cuando la página cargue
  useEffect(() => {
    fetch('http://localhost:8080/api/eventos')
      .then(respuesta => respuesta.json())
      .then(datos => setEventos(datos))
      .catch(error => console.error("Error conectando a la base de datos:", error));
  }, []);

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-[#0D0D0D] to-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Eventos <span className="bg-gradient-to-r from-[#7B2CFF] to-[#00C2FF] bg-clip-text text-transparent">Destacados</span>
          </h2>
          <p className="text-gray-400 text-lg">Los mejores eventos están esperando por ti</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 3. Reemplazamos la lista estática por la variable 'eventos' que viene de Java */}
          {eventos.map((evento: any, index: number) => (
            <EventCard
              key={index}
              /* Como en Java aún no tenemos imagen ni fecha, ponemos unos por defecto por ahora */
              image="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1080&auto=format&fit=crop"
              title={evento.nombre}
              date="Fecha por confirmar" 
              location={evento.ciudad}
              price={`$${evento.precio}`}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}