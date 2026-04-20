/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package com.tickets;

import com.tickets.model.Cliente;
import com.tickets.model.Transaccion;
import com.tickets.model.Evento;
import com.tickets.model.Reporte;
import com.tickets.model.Administrador;
import com.tickets.model.Entrada;
import com.tickets.model.PersonalAcceso;
import com.tickets.model.Notificacion;
import com.tickets.enums.*;
import java.time.LocalDateTime;

public class QueBoleta {

    public static void main(String[] args) {

        // Crear un evento
        Evento evento = new Evento(
                "EVT001",
                "Concierto Rock Nacional",
                "Los Prisioneros",
                "Estadio El Campin - Bogota",
                LocalDateTime.of(2026, 6, 15, 20, 0),
                "El mejor concierto del año",
                150000.0,
                5000,
                EstadoEvento.ACTIVO
        );
        System.out.println(evento.mostrarInfo());
        System.out.println("Enlace: " + evento.generarEnlace());

        // Crear un administrador
        Administrador admin = new Administrador("ADM001", "Carlos Pérez", "carlos@tickets.com", "admin123");
        admin.crearEvento(evento);

        // Crear un cliente
        Cliente cliente = new Cliente("CLI001", "Ana García", "ana@gmail.com", "pass456");

        // Crear una transacción
        Transaccion transaccion = new Transaccion("TRX001", MetodoPago.TARJETA_CREDITO, 150000.0);
        transaccion.procesarPago();
        transaccion.confirmarCompra();
        System.out.println(transaccion.generarComprobante());

        // Crear una entrada
        Entrada entrada = new Entrada("ENT001", cliente.getNombre(), evento.getNombre());
        System.out.println("Codigo QR: " + entrada.generarQR());
        evento.actualizarStock();
        System.out.println("Disponibilidad tras compra: " + evento.consultarDisponibilidad());

        // Crear personal de acceso y validar QR
        PersonalAcceso personal = new PersonalAcceso("PER001", "Luis Torres", "luis@tickets.com", "per789", evento.getIdEvento());
        boolean qrValido = personal.validarQR(entrada.getCodigoQR());
        System.out.println("QR valido: " + qrValido);

        // Generar reporte
        Reporte reporte = new Reporte("REP001", evento.getIdEvento());
        reporte.setEntradasVendidas(1);
        reporte.setIngresoTotal(transaccion.getTotal());
        admin.agregarReporte(reporte);
        reporte.generarReporte();

        // Enviar notificación
        Notificacion notif = new Notificacion(
                "NOT001",
                TipoNotif.CONFIRMACION_COMPRA,
                cliente.getCorreo(),
                "Tu compra fue exitosa. Entrada: " + entrada.getIdEntrada()
        );
        notif.generarCorreo();
    }
}
