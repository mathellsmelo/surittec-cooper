package br.com.surittec.app.repository;


import br.com.surittec.app.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    Optional<Usuario> findByUsername(String username);
    Boolean existsByUsername(String username);

}
