package com.queboleta.catalogo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.queboleta.catalogo.model.Usuario;
import com.queboleta.catalogo.repository.UsuarioRepository;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*") // ¡Súper importante para que React pueda entrar!
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // --- ENDPOINT PARA INICIAR SESIÓN ---
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario loginData) {
        // Java va y busca en la base de datos
        Usuario usuario = usuarioRepository.findByEmailAndPassword(loginData.getEmail(), loginData.getPassword());
        
        if (usuario != null) {
            // Si lo encuentra, se lo devuelve a React con un código 200 (OK)
            return ResponseEntity.ok(usuario);
        } else {
            // Si no lo encuentra, le manda un error 401 a React
            return ResponseEntity.status(401).body("Correo o contraseña incorrectos");
        }
    }

    // --- ENDPOINT PARA REGISTRARSE ---
    @PostMapping("/registrar")
    public ResponseEntity<?> registrar(@RequestBody Usuario nuevoUsuario) {
        try {
            // Nos aseguramos de que todo nuevo registro sea CLIENTE
            nuevoUsuario.setRol("CLIENTE");
            Usuario guardado = usuarioRepository.save(nuevoUsuario);
            return ResponseEntity.ok(guardado);
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error al crear el usuario. ¿Quizás el correo ya existe?");
        }
    }
}