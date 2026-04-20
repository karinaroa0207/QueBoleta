/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tickets.model;

public class Reporte {

    private String idReporte;
    private String idEvento;
    private int entradasVendidas;
    private double ingresoTotal;

    public Reporte() {}

    public Reporte(String idReporte, String idEvento) {
        this.idReporte = idReporte;
        this.idEvento = idEvento;
        this.entradasVendidas = 0;
        this.ingresoTotal = 0.0;
    }

    public void generarReporte() {
        System.out.printf("=== REPORTE ===%n" +
                "ID Reporte: %s%n" +
                "ID Evento: %s%n" +
                "Entradas vendidas: %d%n" +
                "Ingreso total: %.2f%n",
                idReporte, idEvento, entradasVendidas, ingresoTotal);
    }

    // Getters y Setters
    public String getIdReporte() { return idReporte; }
    public void setIdReporte(String idReporte) { this.idReporte = idReporte; }

    public String getIdEvento() { return idEvento; }
    public void setIdEvento(String idEvento) { this.idEvento = idEvento; }

    public int getEntradasVendidas() { return entradasVendidas; }
    public void setEntradasVendidas(int entradasVendidas) { this.entradasVendidas = entradasVendidas; }

    public double getIngresoTotal() { return ingresoTotal; }
    public void setIngresoTotal(double ingresoTotal) { this.ingresoTotal = ingresoTotal; }
}
