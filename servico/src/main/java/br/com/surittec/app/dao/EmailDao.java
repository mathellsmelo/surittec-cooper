package br.com.surittec.app.dao;

import br.com.surittec.app.model.Email;
import org.springframework.data.repository.CrudRepository;

import java.util.Set;

public interface EmailDao extends CrudRepository<Email, Integer> {
    void deleteByCliente_Id(Integer id);

    Set<Email> findByCliente_Id(Integer id);
}
