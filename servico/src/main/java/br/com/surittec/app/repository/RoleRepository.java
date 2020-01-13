package br.com.surittec.app.repository;

import br.com.surittec.app.model.Role;
import br.com.surittec.app.model.RoleNome;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByNome(RoleNome roleNome);
}
