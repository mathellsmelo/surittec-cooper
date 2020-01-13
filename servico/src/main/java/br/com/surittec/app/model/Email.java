package br.com.surittec.app.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "Email")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Email {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String endereco;

    @ManyToOne
    private Cliente cliente;

}
