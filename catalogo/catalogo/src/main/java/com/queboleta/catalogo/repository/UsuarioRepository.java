package com.queboleta.catalogo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.queboleta.catalogo.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    // Esta línea es mágica: Spring Boot crea la consulta SQL automáticamente
    Usuario findByEmailAndPassword(String email, String password);
    
}