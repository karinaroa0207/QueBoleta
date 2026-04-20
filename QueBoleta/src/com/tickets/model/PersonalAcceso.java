/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tickets.model;

import java.util.ArrayList;
import java.util.List;

public class PersonalAcceso extends Usuario {

    private String eventoAsignado;
    private List<String> asistentes;

    public PersonalAcceso() {
        this.asistentes = new ArrayList<>();
    }

    public PersonalAcceso(String idUsuario, String nombre, String correo, String contraseña, String eventoAsignado) {
        super(idUsuario, nombre, correo, contraseña);
        this.eventoAsignado = eventoAsignado;
        this.asistentes = new ArrayList<>();
    }

    public boolean validarQR(String codigoQR) {
        // Lógica de validación del código QR
        System.out.println("Validando QR: " + codigoQR);
        return codigoQR != null && !codigoQR.isEmpty();
    }

    public List<String> verAsistentes() {
        return asistentes;
    }

    // Getters y Setters
    public String getEventoAsignado() { return eventoAsignado; }
    public void setEventoAsignado(String eventoAsignado) { this.eventoAsignado = eventoAsignado; }

    public List<String> getAsistentes() { return asistentes; }
    public void setAsistentes(List<String> asistentes) { this.asistentes = asistentes; }
}
