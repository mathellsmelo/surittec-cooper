package br.com.surittec.app.dao;

import br.com.surittec.app.model.Cliente;
import org.springframework.data.repository.CrudRepository;

public interface ClienteDao extends CrudRepository<Cliente, Integer> {
}
