/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tickets.model;

import java.util.ArrayList;
import java.util.List;

public class Administrador extends Usuario {

    private List<Evento> eventosDisponibles;
    private List<Reporte> reportes;

    public Administrador() {
        this.eventosDisponibles = new ArrayList<>();
        this.reportes = new ArrayList<>();
    }

    public Administrador(String idUsuario, String nombre, String correo, String contraseña) {
        super(idUsuario, nombre, correo, contraseña);
        this.eventosDisponibles = new ArrayList<>();
        this.reportes = new ArrayList<>();
    }

    public void crearEvento(Evento evento) {
        eventosDisponibles.add(evento);
        System.out.println("Evento creado: " + evento.getNombre());
    }

    public void editarEvento(Evento evento) {
        System.out.println("Evento editado: " + evento.getNombre());
    }

    public void eliminarEvento(Evento evento) {
        eventosDisponibles.remove(evento);
        System.out.println("Evento eliminado: " + evento.getNombre());
    }

    public void agregarReporte(Reporte reporte) {
        reportes.add(reporte);
    }

    public List<Reporte> verReportes() {
        return reportes;
    }

    public void gestionarReembolso(Transaccion transaccion) {
        transaccion.solicitarReembolso();
        System.out.println("Reembolso gestionado para transacción: " + transaccion.getIdTransaccion());
    }

    // Getters y Setters
    public List<Evento> getEventosDisponibles() { return eventosDisponibles; }
    public void setEventosDisponibles(List<Evento> eventosDisponibles) { this.eventosDisponibles = eventosDisponibles; }

    public List<Reporte> getReportes() { return reportes; }
    public void setReportes(List<Reporte> reportes) { this.reportes = reportes; }
}
