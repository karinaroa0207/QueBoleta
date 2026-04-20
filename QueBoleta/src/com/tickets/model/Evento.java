/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tickets.model;

import com.tickets.enums.EstadoEvento;
import java.time.LocalDateTime;

public class Evento {

    private String idEvento;
    private String nombre;
    private String artista;
    private String lugar;
    private LocalDateTime fechaHora;
    private String sinopsis;
    private double precio;
    private int aforoDisponible;
    private EstadoEvento estado;
    private String enlace;
    private int disponibilidad;

    public Evento() {}

    public Evento(String idEvento, String nombre, String artista, String lugar,
                  LocalDateTime fechaHora, String sinopsis, double precio,
                  int aforoDisponible, EstadoEvento estado) {
        this.idEvento = idEvento;
        this.nombre = nombre;
        this.artista = artista;
        this.lugar = lugar;
        this.fechaHora = fechaHora;
        this.sinopsis = sinopsis;
        this.precio = precio;
        this.aforoDisponible = aforoDisponible;
        this.estado = estado;
        this.disponibilidad = aforoDisponible;
    }

    public String generarEnlace() {
        this.enlace = "https://tickets.com/evento/" + idEvento;
        return this.enlace;
    }

    public int consultarDisponibilidad() {
        return this.disponibilidad;
    }

    public void actualizarStock() {
        if (this.disponibilidad > 0) {
            this.disponibilidad--;
        }
    }

    public String mostrarInfo() {
        return String.format("Evento: %s | Artista: %s | Lugar: %s | Fecha: %s | Precio: %.2f | Disponibles: %d",
                nombre, artista, lugar, fechaHora, precio, disponibilidad);
    }

    // Getters y Setters
    public String getIdEvento() { return idEvento; }
    public void setIdEvento(String idEvento) { this.idEvento = idEvento; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getArtista() { return artista; }
    public void setArtista(String artista) { this.artista = artista; }

    public String getLugar() { return lugar; }
    public void setLugar(String lugar) { this.lugar = lugar; }

    public LocalDateTime getFechaHora() { return fechaHora; }
    public void setFechaHora(LocalDateTime fechaHora) { this.fechaHora = fechaHora; }

    public String getSinopsis() { return sinopsis; }
    public void setSinopsis(String sinopsis) { this.sinopsis = sinopsis; }

    public double getPrecio() { return precio; }
    public void setPrecio(double precio) { this.precio = precio; }

    public int getAforoDisponible() { return aforoDisponible; }
    public void setAforoDisponible(int aforoDisponible) { this.aforoDisponible = aforoDisponible; }

    public EstadoEvento getEstado() { return estado; }
    public void setEstado(EstadoEvento estado) { this.estado = estado; }

    public String getEnlace() { return enlace; }
    public void setEnlace(String enlace) { this.enlace = enlace; }

    public int getDisponibilidad() { return disponibilidad; }
    public void setDisponibilidad(int disponibilidad) { this.disponibilidad = disponibilidad; }
}
