package br.com.surittec.app.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "Tipo_Telefone")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TipoTelefone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String descricao;

}
