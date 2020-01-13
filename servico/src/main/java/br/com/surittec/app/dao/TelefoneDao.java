package br.com.surittec.app.dao;

import br.com.surittec.app.model.Telefone;
import org.springframework.data.repository.CrudRepository;

import java.util.Set;

public interface TelefoneDao extends CrudRepository<Telefone, Integer> {

    void deleteByCliente_Id(Integer id);

    Set<Telefone> findByCliente_Id(Integer id);

}
