package com.queboleta.catalogo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.queboleta.catalogo.model.Evento;

public interface EventoRepository extends JpaRepository<Evento, Long> {
}