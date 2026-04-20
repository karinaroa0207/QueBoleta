/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tickets.model;

import com.tickets.enums.TipoNotif;

public class Notificacion {

    private String idNotif;
    private TipoNotif tipoNotif;
    private String destinatario;
    private String contenido;
    private boolean estado;

    public Notificacion() {}

    public Notificacion(String idNotif, TipoNotif tipoNotif, String destinatario, String contenido) {
        this.idNotif = idNotif;
        this.tipoNotif = tipoNotif;
        this.destinatario = destinatario;
        this.contenido = contenido;
        this.estado = false;
    }

    public void generarCorreo() {
        System.out.printf("Enviando correo a: %s%nTipo: %s%nContenido: %s%n",
                destinatario, tipoNotif, contenido);
        this.estado = true;
    }

    // Getters y Setters
    public String getIdNotif() { return idNotif; }
    public void setIdNotif(String idNotif) { this.idNotif = idNotif; }

    public TipoNotif getTipoNotif() { return tipoNotif; }
    public void setTipoNotif(TipoNotif tipoNotif) { this.tipoNotif = tipoNotif; }

    public String getDestinatario() { return destinatario; }
    public void setDestinatario(String destinatario) { this.destinatario = destinatario; }

    public String getContenido() { return contenido; }
    public void setContenido(String contenido) { this.contenido = contenido; }

    public boolean isEstado() { return estado; }
    public void setEstado(boolean estado) { this.estado = estado; }
}
