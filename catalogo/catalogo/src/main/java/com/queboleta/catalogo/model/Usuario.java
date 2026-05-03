package com.queboleta.catalogo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "usuarios")
public class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    
    // Le decimos a Java: "Esta variable se conecta con la columna 'correo' de Postgres"
    @Column(name = "correo", unique = true)
    private String email;
    
    // Lo mismo aquí: se conecta con 'contrasena'
    @Column(name = "contrasena")
    private String password;

    // Agregamos el rol que me recordaste (ADMIN o CLIENTE)
    @Column(name = "rol")
    private String rol;

    // Constructor vacío (Obligatorio para Spring Boot)
    public Usuario() {
    }

    // --- GETTERS Y SETTERS MANUALES ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }
}