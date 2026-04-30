package com.queboleta.catalogo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity // Esto le dice a Spring que cree la tabla en Postgres
@Data   // Esto crea automáticamente los Getters y Setters (gracias a Lombok)[cite: 1]
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String ciudad;
    private Double precio;
    
    // Más adelante añadiremos aquí: private String imagenUrl;
}