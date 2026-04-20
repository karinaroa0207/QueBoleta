/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tickets.model;


import com.tickets.enums.MetodoPago;
import java.time.LocalDateTime;

public class Transaccion {

    private String idTransaccion;
    private LocalDateTime fecha;
    private double impuesto;
    private double total;
    private boolean estado;
    private MetodoPago metodoPago;

    public Transaccion() {}

    public Transaccion(String idTransaccion, MetodoPago metodoPago, double subtotal) {
        this.idTransaccion = idTransaccion;
        this.fecha = LocalDateTime.now();
        this.metodoPago = metodoPago;
        this.impuesto = calcularImpuesto(subtotal);
        this.total = subtotal + this.impuesto;
        this.estado = false;
    }

    public double calcularImpuesto(double subtotal) {
        // IVA 19%
        this.impuesto = subtotal * 0.19;
        return this.impuesto;
    }

    public boolean procesarPago() {
        // Lógica de procesamiento del pago
        System.out.println("Procesando pago de: " + total + " con " + metodoPago);
        this.estado = true;
        return this.estado;
    }

    public void confirmarCompra() {
        if (this.estado) {
            System.out.println("Compra confirmada. Transaccion: " + idTransaccion);
        }
    }

    public String generarComprobante() {
        return String.format("COMPROBANTE - ID: %s | Fecha: %s | Total: %.2f | Metodo: %s",
                idTransaccion, fecha, total, metodoPago);
    }

    public void solicitarReembolso() {
        this.estado = false;
        System.out.println("Reembolso solicitado para transacción: " + idTransaccion);
    }

    // Getters y Setters
    public String getIdTransaccion() { return idTransaccion; }
    public void setIdTransaccion(String idTransaccion) { this.idTransaccion = idTransaccion; }

    public LocalDateTime getFecha() { return fecha; }
    public void setFecha(LocalDateTime fecha) { this.fecha = fecha; }

    public double getImpuesto() { return impuesto; }
    public void setImpuesto(double impuesto) { this.impuesto = impuesto; }

    public double getTotal() { return total; }
    public void setTotal(double total) { this.total = total; }

    public boolean isEstado() { return estado; }
    public void setEstado(boolean estado) { this.estado = estado; }

    public MetodoPago getMetodoPago() { return metodoPago; }
    public void setMetodoPago(MetodoPago metodoPago) { this.metodoPago = metodoPago; }
}