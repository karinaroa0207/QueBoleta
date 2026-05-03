import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Plus, X, Type, MapPin, Calendar, DollarSign, LayoutGrid, Image as ImageIcon, Trash2, Edit, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AdminDashboard() {
  const [eventos, setEventos] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);

  // 1. ESTADO ACTUALIZADO CON LOS NUEVOS CAMPOS
  const [formData, setFormData] = useState({
    nombre: '', fecha: '', ciudad: '', precio: '', imagenUrl: '', categoriaId: '',
    descripcion: '', capacidad: ''
  });

  const cargarDatos = () => {
    fetch('http://localhost:8080/api/eventos')
      .then(res => res.json())
      .then(data => setEventos(data))
      .catch(err => console.error("Error eventos:", err));

    fetch('http://localhost:8080/api/categorias')
      .then(res => res.json())
      .then(data => {
        setCategorias(data);
        if (data.length > 0 && !editandoId) {
          setFormData(prev => ({ ...prev, categoriaId: data[0].id.toString() }));
        }
      })
      .catch(err => console.error("Error categorías:", err));
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // Firma actualizada para aceptar Inputs, Selects y TextAreas
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditar = (evento: any) => {
    setFormData({
      nombre: evento.nombre,
      fecha: evento.fecha,
      ciudad: evento.ciudad,
      precio: evento.precio.toString(),
      imagenUrl: evento.imagenUrl,
      categoriaId: evento.categoria?.id.toString() || categorias[0]?.id.toString(),
      // 2. CARGAMOS LOS DATOS AL EDITAR
      descripcion: evento.descripcion || '',
      capacidad: evento.capacidad?.toString() || ''
    });
    setEditandoId(evento.id);
    setMostrarFormulario(true);
  };

  const cerrarFormulario = () => {
    setMostrarFormulario(false);
    setEditandoId(null);
    setFormData({ 
      nombre: '', fecha: '', ciudad: '', precio: '', imagenUrl: '', 
      categoriaId: categorias[0]?.id.toString() || '',
      descripcion: '', capacidad: '' // Limpiamos también estos
    });
  };

  const handleEliminar = async (id: number, nombre: string) => {
    const confirmar = window.confirm(`¿Estás segura de que deseas eliminar el evento "${nombre}"? Esta acción no se puede deshacer.`);
    
    if (confirmar) {
      try {
        const response = await fetch(`http://localhost:8080/api/eventos/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          alert("✅ Evento eliminado correctamente.");
          cargarDatos(); 
        } else {
          alert("❌ Error al eliminar el evento.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);

    // 3. ENVIAMOS LOS NUEVOS DATOS A JAVA
    const eventoPayload = {
      nombre: formData.nombre,
      fecha: formData.fecha,
      ciudad: formData.ciudad,
      precio: parseFloat(formData.precio),
      imagenUrl: formData.imagenUrl,
      categoria: { id: parseInt(formData.categoriaId) },
      descripcion: formData.descripcion,
      capacidad: parseInt(formData.capacidad)
    };

    const url = editandoId ? `http://localhost:8080/api/eventos/${editandoId}` : 'http://localhost:8080/api/eventos';
    const method = editandoId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventoPayload)
      });

      if (response.ok) {
        alert(editandoId ? "✅ ¡Evento actualizado con éxito!" : "✅ ¡Evento creado con éxito!");
        cerrarFormulario();
        cargarDatos();
      } else {
        alert("❌ Error al guardar el evento.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] pt-28 pb-12 px-4 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="absolute top-8 left-8 z-50">
        <Link to="/" className="flex items-center gap-2 group cursor-pointer">
          <Sparkles className="text-[#7B2CFF] w-8 h-8" />
          <span className="text-2xl font-bold bg-gradient-to-r from-[#7B2CFF] to-[#00C2FF] bg-clip-text text-transparent">
            QueBoleta
          </span>
        </Link>
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Panel de <span className="bg-gradient-to-r from-[#7B2CFF] to-[#00C2FF] bg-clip-text text-transparent">Administración</span>
            </h1>
            <p className="text-gray-400">Gestiona todos los eventos de QueBoleta</p>
          </div>
          
          {!mostrarFormulario ? (
            <button 
              onClick={() => { setEditandoId(null); setMostrarFormulario(true); }}
              className="bg-gradient-to-r from-[#7B2CFF] to-[#00C2FF] text-white font-bold py-3 px-6 rounded-lg hover:shadow-[0_0_20px_rgba(123,44,255,0.4)] transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" /> Crear Nuevo Evento
            </button>
          ) : (
            <button 
              onClick={cerrarFormulario}
              className="bg-[#1a1a1a] border border-gray-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-800 transition-all flex items-center gap-2"
            >
              <X className="w-5 h-5" /> Cancelar
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {!mostrarFormulario ? (
            <motion.div key="tabla" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-[#111111] border border-gray-800 rounded-2xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-white">
                  <thead className="bg-[#1A1A1A] border-b border-gray-800">
                    <tr>
                      <th className="p-4 text-gray-400 font-semibold">ID</th>
                      <th className="p-4 text-gray-400 font-semibold">Nombre del Evento</th>
                      <th className="p-4 text-gray-400 font-semibold">Categoría</th>
                      <th className="p-4 text-gray-400 font-semibold">Fecha</th>
                      <th className="p-4 text-gray-400 font-semibold text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventos.map((evento) => (
                      <tr key={evento.id} className="border-b border-gray-800/50 hover:bg-[#1a1a1a] transition-colors">
                        <td className="p-4 text-gray-500">#{evento.id}</td>
                        <td className="p-4 font-bold text-white flex items-center gap-3">
                           <img src={evento.imagenUrl} alt="miniatura" className="w-10 h-10 rounded-md object-cover border border-gray-700" />
                           {evento.nombre}
                        </td>
                        <td className="p-4">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#7B2CFF]/20 text-[#7B2CFF] border border-[#7B2CFF]/30">
                            {evento.categoria?.nombre || 'Sin categoría'}
                          </span>
                        </td>
                        <td className="p-4 text-gray-300">{evento.fecha}</td>
                        <td className="p-4 text-right">
                          <button onClick={() => handleEditar(evento)} className="text-[#00C2FF] hover:text-white p-2 transition-colors mr-2" title="Editar Evento">
                            <Edit className="w-5 h-5" />
                          </button>
                          <button onClick={() => handleEliminar(evento.id, evento.nombre)} className="text-red-500 hover:text-red-400 p-2 transition-colors" title="Eliminar Evento">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {eventos.length === 0 && (
                      <tr><td colSpan={5} className="p-8 text-center text-gray-500">No hay eventos creados todavía.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : (
            <motion.div key="formulario" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-[#111111] border border-gray-800 rounded-3xl p-8 shadow-[0_0_50px_rgba(123,44,255,0.05)]">
              
              <div className="flex items-center gap-3 mb-8 border-b border-gray-800 pb-6">
                <div className="p-3 bg-gradient-to-br from-[#7B2CFF] to-[#00C2FF] rounded-xl text-white">
                  {editandoId ? <Edit className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                </div>
                <h2 className="text-2xl font-bold text-white">
                  {editandoId ? 'Editar Evento' : 'Crear Nuevo Evento'}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 flex items-center gap-2"><Type className="w-4 h-4 text-[#7B2CFF]" /> Nombre del Evento</label>
                    <input required type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#7B2CFF] outline-none transition-all" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 flex items-center gap-2"><MapPin className="w-4 h-4 text-[#00C2FF]" /> Ciudad</label>
                    <input required type="text" name="ciudad" value={formData.ciudad} onChange={handleChange} className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#00C2FF] outline-none transition-all" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 flex items-center gap-2"><Calendar className="w-4 h-4 text-[#FF2D95]" /> Fecha</label>
                    <input required type="text" name="fecha" value={formData.fecha} onChange={handleChange} placeholder="Ej: 4 de Diciembre, 2026" className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#FF2D95] outline-none transition-all" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 flex items-center gap-2"><DollarSign className="w-4 h-4 text-[#FFD166]" /> Precio Mínimo (COP)</label>
                    <input required type="number" name="precio" value={formData.precio} onChange={handleChange} className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#FFD166] outline-none transition-all" />
                  </div>

                  {/* 4. LOS DOS CAMPOS NUEVOS ESTÁN AQUÍ */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#00C2FF]" /> Aforo / Asientos Totales
                    </label>
                    <input required type="number" name="capacidad" value={formData.capacidad} onChange={handleChange} placeholder="Ej: 14000" className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#00C2FF] outline-none transition-all" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 flex items-center gap-2"><LayoutGrid className="w-4 h-4 text-[#7B2CFF]" /> Categoría</label>
                    <select name="categoriaId" value={formData.categoriaId} onChange={handleChange} className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#7B2CFF] outline-none transition-all appearance-none cursor-pointer">
                      {categorias.map(cat => <option key={cat.id} value={cat.id}>{cat.nombre}</option>)}
                    </select>
                  </div>

                  {/* El Textarea ocupa el ancho de las dos columnas para que se vea bien */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                      <Type className="w-4 h-4 text-[#FF2D95]" /> Descripción Completa del Evento
                    </label>
                    <textarea required name="descripcion" value={formData.descripcion} onChange={handleChange} rows={3} placeholder="Ej: Disfruta de un concierto inigualable con los mejores éxitos..." className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#FF2D95] outline-none transition-all resize-none" />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-400 flex items-center gap-2"><ImageIcon className="w-4 h-4 text-[#7B2CFF]" /> Ruta de la Imagen</label>
                    <input required type="text" name="imagenUrl" value={formData.imagenUrl} onChange={handleChange} placeholder="Ej: /imagenes/foto.jpg" className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#7B2CFF] outline-none transition-all" />
                  </div>
                </div>

                <button type="submit" disabled={cargando} className="w-full mt-8 py-4 rounded-xl font-bold text-white text-lg relative overflow-hidden group disabled:opacity-50 transition-all" style={{ background: 'linear-gradient(135deg, #7B2CFF 0%, #00C2FF 100%)' }}>
                  {cargando ? 'Guardando...' : editandoId ? 'Actualizar Evento' : 'Publicar Evento'}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}