package br.com.surittec.app.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "Endereco")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Endereco {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String logradouro;
    private String bairro;
    private String cidade;
    private String uf;
    private String complemento;
    private String cep;

}
