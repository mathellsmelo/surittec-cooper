package br.com.surittec.app.model;

import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;


@Entity
@Table(name = "Cliente")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Length(min = 3, max = 100)
    private String nome;

    @Column(length=11)
    private String cpf;

    @ManyToOne(cascade= CascadeType.ALL)
    @JoinColumn
    private Endereco endereco;

}
