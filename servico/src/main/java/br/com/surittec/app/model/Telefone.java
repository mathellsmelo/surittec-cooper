package br.com.surittec.app.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "Telefone")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Embeddable
public class Telefone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length=11)
    private String numero;

    @ManyToOne
    private TipoTelefone tipo;

    @ManyToOne
    private Cliente cliente;


}
