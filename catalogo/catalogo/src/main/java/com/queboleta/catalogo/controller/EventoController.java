package com.queboleta.catalogo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.queboleta.catalogo.model.Evento;
import com.queboleta.catalogo.repository.EventoRepository;

@RestController
@RequestMapping("/api/eventos")
@CrossOrigin(origins = "*") // ¡Súper importante para que React pueda leerlos!
public class EventoController {

    @Autowired
    private EventoRepository eventoRepository;

    // 1. OBTENER TODOS LOS EVENTOS (Para el Inicio y el Panel Admin)
    @GetMapping
    public List<Evento> obtenerEventos() {
        return eventoRepository.findAll();
    }

    // OBTENER UN EVENTO POR SU ID (Para la página de detalles)
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerEventoPorId(@PathVariable Long id) {
        return eventoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // 2. CREAR UN NUEVO EVENTO (Para el botón del Administrador)
    @PostMapping
    public ResponseEntity<?> crearEvento(@RequestBody Evento nuevoEvento) {
        try {
            Evento guardado = eventoRepository.save(nuevoEvento);
            return ResponseEntity.ok(guardado);
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error al crear el evento");
        }
    }

    // 3. ACTUALIZAR UN EVENTO EXISTENTE
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarEvento(@PathVariable Long id, @RequestBody Evento eventoActualizado) {
        return eventoRepository.findById(id)
                .map(eventoExistente -> {
                    eventoExistente.setNombre(eventoActualizado.getNombre());
                    eventoExistente.setCiudad(eventoActualizado.getCiudad());
                    eventoExistente.setFecha(eventoActualizado.getFecha());
                    eventoExistente.setPrecio(eventoActualizado.getPrecio());
                    eventoExistente.setImagenUrl(eventoActualizado.getImagenUrl());
                    eventoExistente.setCategoria(eventoActualizado.getCategoria()); // Actualiza también la categoría
                    eventoExistente.setDescripcion(eventoActualizado.getDescripcion());
                    eventoExistente.setCapacidad(eventoActualizado.getCapacidad());

                    Evento guardado = eventoRepository.save(eventoExistente);
                    return ResponseEntity.ok(guardado);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // 4. ELIMINAR UN EVENTO
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarEvento(@PathVariable Long id) {
        return eventoRepository.findById(id)
                .map(evento -> {
                    eventoRepository.delete(evento);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}