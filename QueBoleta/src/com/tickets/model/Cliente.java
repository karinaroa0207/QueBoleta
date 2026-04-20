/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tickets.model;

import java.util.ArrayList;
import java.util.List;

public class Cliente extends Usuario {

    private List<Entrada> entradasActivas;
    private List<Entrada> historialCompras;

    public Cliente() {
        this.entradasActivas = new ArrayList<>();
        this.historialCompras = new ArrayList<>();
    }

    public Cliente(String idUsuario, String nombre, String correo, String contraseña) {
        super(idUsuario, nombre, correo, contraseña);
        this.entradasActivas = new ArrayList<>();
        this.historialCompras = new ArrayList<>();
    }

    public List<Evento> verEventos() {
        // Retorna lista de eventos disponibles
        return new ArrayList<>();
    }

    public void comprarEntrada(Evento evento) {
        // Lógica de compra de entrada
        System.out.println("Comprando entrada para el evento: " + evento.getNombre());
    }

    public List<Entrada> verHistorial() {
        return historialCompras;
    }

    // Getters y Setters
    public List<Entrada> getEntradasActivas() { return entradasActivas; }
    public void setEntradasActivas(List<Entrada> entradasActivas) { this.entradasActivas = entradasActivas; }

    public List<Entrada> getHistorialCompras() { return historialCompras; }
    public void setHistorialCompras(List<Entrada> historialCompras) { this.historialCompras = historialCompras; }
}
