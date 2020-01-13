package br.com.surittec.app.dao;

import br.com.surittec.app.model.TipoTelefone;
import org.springframework.data.repository.CrudRepository;

public interface TiposTelefoneDao extends CrudRepository<TipoTelefone, Integer> {
}
