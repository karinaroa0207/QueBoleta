package com.queboleta.catalogo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/eventos")
@CrossOrigin(origins = "http://localhost:5173")
public class EventoController {

    @Autowired
    private EventoRepository eventoRepository; // Esto conecta con Postgres

    @GetMapping
    public List<Evento> obtenerEventos() {
        // Esto trae TODO lo que insertaste en pgAdmin (Estéreo Picnic, etc.)
        return eventoRepository.findAll();
    }
}