package br.com.surittec.app.payload;

import br.com.surittec.app.model.Email;
import br.com.surittec.app.model.Endereco;
import br.com.surittec.app.model.Telefone;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class ClienteRequest {

    private Integer id;
    private String nome;
    private String cpf;
    private Endereco endereco;
    private Set<Telefone> telefones;
    private Set<Email> emails;

}
