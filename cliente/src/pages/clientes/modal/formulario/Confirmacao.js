import React, { Component } from 'react';
import { Button, List } from 'semantic-ui-react';
import api from "../../../../services/api";
import { mascaraCpf, mascaraCep, mascaraTelefone } from '../../../../services/mask'

export default class Confirmacao extends Component{
    constructor(props) {
        super(props);
        this.state = {
            values: this.props.values
        }
    }

    save = async (e) => {
        e.preventDefault();


        const id = this.state.values.id;


        if(id === 0){
            console.log('Não existe ID');
            const response = await api.post('/clientes', {
                    nome: this.state.values.nome,
                    cpf: this.state.values.cpf,
                    endereco: {
                        logradouro: this.state.values.endereco.logradouro,
                        bairro: this.state.values.endereco.bairro,
                        cidade: this.state.values.endereco.cidade,
                        uf: this.state.values.endereco.uf,
                        complemento: this.state.values.endereco.complemento,
                        cep: this.state.values.endereco.cep
                    },
                    telefones: this.state.values.telefones,
                    emails: this.state.values.emails
                }
            );
            alert(response.data);
        } else {
            console.log('Existe ID');
            const response = await api.put(`/clientes/${id}`, {
                id: this.state.values.id,
                nome: this.state.values.nome,
                cpf: this.state.values.cpf,
                endereco: {
                    logradouro: this.state.values.endereco.logradouro,
                    bairro: this.state.values.endereco.bairro,
                    cidade: this.state.values.endereco.cidade,
                    uf: this.state.values.endereco.uf,
                    complemento: this.state.values.endereco.complemento,
                    cep: this.state.values.endereco.cep
                },
                telefones: this.state.values.telefones,
                emails: this.state.values.emails
                }
            );
            alert(response.data);
        }

        window.location.reload();

    }

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render(){
        const {values: { nome, cpf, endereco, emails, telefones }} = this.props;
        console.log(endereco);
        return(
            <div>
                <h1 className="ui centered">Confirme as informações</h1>
                <List>
                    <List.Item>
                        <List.Icon name='users' />
                        <List.Content>Nome: {nome}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='users' />
                        <List.Content>CPF: {mascaraCpf(cpf)}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='users' />
                        <List.Content>Logradouro: {endereco.logradouro}, {mascaraCep(endereco.cep)}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='users' />
                        <List.Content>Bairro: {endereco.bairro} </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='users' />
                        <List.Content>Cidade/UF: {endereco.cidade}, {endereco.uf}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='users' />
                        <List.Content>Complemento: {endereco.complemento}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='users' />
                        <List.Content>Emails: {emails.map((email, i) => (
                            email.endereco + ' | '
                        ))}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='users' />
                        <List.Content>Telefones: {telefones.map((telefone, i) => (
                            telefone.tipo.descricao + ':' + mascaraTelefone(telefone.numero) + ' | '
                        ))}</List.Content>
                    </List.Item>
                </List>

                <Button onClick={this.back}>Voltar</Button>
                <Button onClick={this.save}>Salvar</Button>
            </div>
        )
    }
}
