import React, { Component } from 'react';
import InfoBasicas from './InfoBasicas';
import Endereco from './Endereco';
import Contato from './Contato';
import Confirmacao from './Confirmacao';

export default class MainForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            id: 0,
            nome: '',
            cpf: '',
            endereco: {
                cep: '',
                logradouro: '',
                bairro: '',
                cidade: '',
                uf: '',
                complemento: ''
            },
            telefones: [{
                tipo: {
                    id: 0,
                    descricao: ''
                },
                numero: ''
            }],
            emails: [{
                endereco: ''
            }]
        }
    }

    handleState = (field, array) => {
        this.setState({[field]: array});
    }

    componentDidMount() {
        
        if(this.props.operacao === 'ALTERACAO'){
            this.preencherChampos(this.props.data)
        }
    }

    preencherChampos(data) {
        const arrayTelefones = [];
        data.telefones.map(telefone => (
            arrayTelefones.push({numero: telefone.numero, tipo: telefone.tipo })
        ));

        const arrayEmails = [];
        data.emails.map(email => (
            arrayEmails.push({endereco: email.endereco})
        ));

        this.setState({
            id: data.id,
            nome: data.nome,
            cpf: data.cpf,
            endereco: {
                cep: data.endereco.cep,
                logradouro: data.endereco.logradouro,
                bairro: data.endereco.bairro,
                cidade: data.endereco.cidade,
                uf: data.endereco.uf,
                complemento: data.endereco.complemento
            },
            telefones: arrayTelefones,
            emails: arrayEmails
        });

    }

    nextStep = () => {
        const { step } = this.state
        this.setState({
            step : step + 1
        })
    }

    prevStep = () => {
        const { step } = this.state
        this.setState({
            step : step - 1
        })
    }

    handleChange = input => event => {
        this.setState({ [input] : event.target.value })
    }

    handleEnderecoChange = input => event => {
        let target = event.target.value;
        this.setState(prevState => ({
            endereco: {
                ...prevState.endereco,
                [input]: target
            }
        }))
    }

    render(){
        const {step} = this.state;
        const { id, nome, cpf, endereco, emails, telefones } = this.state;
        const values = { id, nome, cpf, endereco, emails, telefones };

        //eslint-disable-next-line
        switch(step) {
            case 1:
                return <InfoBasicas
                    nextStep={this.nextStep}
                    handleChange = {this.handleChange}
                    values={values}
                />
            case 2:
                return <Endereco
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleEnderecoChange = {this.handleEnderecoChange}
                    values={values.endereco}
                />
            case 3:
                return <Contato
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleState = {this.handleState}
                    values={values}
                />
            case 4:
                return <Confirmacao
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    values={values}
                />
        }
    }
}
