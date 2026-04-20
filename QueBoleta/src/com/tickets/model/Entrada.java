/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tickets.model;

import com.tickets.enums.EstadoEntrada;

public class Entrada {

    private String idEntrada;
    private String codigoQR;
    private EstadoEntrada estado;
    private String propietario;
    private String evento;

    public Entrada() {}

    public Entrada(String idEntrada, String propietario, String evento) {
        this.idEntrada = idEntrada;
        this.propietario = propietario;
        this.evento = evento;
        this.estado = EstadoEntrada.ACTIVA;
    }

    public String generarQR() {
        this.codigoQR = "QR-" + idEntrada + "-" + System.currentTimeMillis();
        return this.codigoQR;
    }

    // Getters y Setters
    public String getIdEntrada() { return idEntrada; }
    public void setIdEntrada(String idEntrada) { this.idEntrada = idEntrada; }

    public String getCodigoQR() { return codigoQR; }
    public void setCodigoQR(String codigoQR) { this.codigoQR = codigoQR; }

    public EstadoEntrada getEstado() { return estado; }
    public void setEstado(EstadoEntrada estado) { this.estado = estado; }

    public String getPropietario() { return propietario; }
    public void setPropietario(String propietario) { this.propietario = propietario; }

    public String getEvento() { return evento; }
    public void setEvento(String evento) { this.evento = evento; }
}