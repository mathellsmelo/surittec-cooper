import React, { Component } from 'react';
import { Form, Button, Label, Icon } from 'semantic-ui-react';
import api from "../../../../services/api";
import { mascaraTelefone } from '../../../../services/mask'

export default class Contato extends Component{
    constructor(props) {
        super(props);
        this.state = {
            tiposTelefone: [],
            telefone_tipo: '',
            telefone_numero: '',
            endereco_email: ''
        }
    }

    componentDidMount() {
        if(this.props.values.telefones){
            if(this.props.values.telefones[0].numero === "" && this.props.values.telefones[0].tipo.id === 0 && this.props.values.telefones[0].tipo.descricao === ""){
                this.removerTelefone(this.props.values.telefones[0]);
            }
        }
        if(this.props.values.emails){
            if(this.props.values.emails[0].endereco === ""){
                this.removerEmail(this.props.values.emails[0]);
            }
        }
        this.recuperarTiposDeTelefone();
    }

    handleChange = input => event => {
        this.setState({ [input] : event.target.value })
    }

    handleSelectChange(event, data) {
        const { value } = data;
        const { key, text } = data.options.find(o => o.value === value);
        this.setState({
            telefone_tipo: key,
            telefone_desc: text
        })
    }

    recuperarTiposDeTelefone = async() => {
        const tipos = await api.get('/tipos-telefone')

        var options = [];

        tipos.data.forEach((item, index) => {
            options[index] = {
                key: item.id,
                text: item.descricao,
                value: item.descricao.toLowerCase(),
                index: index
            }
        })

        this.setState({
            tiposTelefone: options
        })
    }

    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    adicionarTelefone() {
        const { values } = this.props;
        if(this.validarTelefone(this.state.telefone_numero)){
            values.telefones.push({
                numero: this.state.telefone_numero,
                tipo: { id: this.state.telefone_tipo, descricao: this.state.telefone_desc }

            });
            const array = values.telefones;
            this.props.handleState('telefones' , array);
        }
    }

    validarTelefone(telefone) {
        if(telefone.length === 10 || telefone.length === 11){
            return true;
        } else {
            return false;
        }
    }

    removerTelefone(i) {
        const { values } = this.props;
        var array = [...values.telefones];
        var index = array.indexOf(i);
        if (index !== -1) {
            array.splice(index, 1);
            this.props.handleState('telefones', array);
        }
    }

    adicionarEmail() {
        const { values } = this.props;
        if(this.validarEmail(this.state.endereco_email)){
            values.emails.push({ endereco: this.state.endereco_email });
            const array = values.emails;
            this.props.handleState('emails' , array);
        }
    }

    validarEmail(email) {
        //eslint-disable-next-line
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(re.test(email.toLowerCase())){
            return true;
        } else {
            return false;
        }

    }

    removerEmail(i) {
        const { values } = this.props;
        var array = [...values.emails];
        var index = array.indexOf(i);
        if (index !== -1) {
            array.splice(index, 1);
            this.props.handleState('emails', array);
        }
    }

    isFormValido() {
        const { values } = this.props;
        if(values.telefones.length > 0 && values.emails.length > 0){
            return false;
        } else {
            return true;
        }
    }

    render(){
        const { values } = this.props;
        return(
            <Form color='blue' >
                <h1 className="ui centered">Informações de Contato</h1>
                <Form.Field>
                    <div>
                        {values.telefones.map(telefone => (
                            <div key={telefone.numero}>
                                <Label as='a' className="large rectangle">
                                    <Icon name='phone' />
                                    {telefone.tipo.descricao.toUpperCase()} : {mascaraTelefone(telefone.numero)}
                                </Label>
                                <Button
                                    type="button"
                                    className="small"
                                    onClick={ () => this.removerTelefone(telefone) }
                                >
                                    -
                                </Button>
                            </div>
                        ))}
                    </div>
                    <Form.Group inline>
                        <Form.Select
                            label='Tipo'
                            options={this.state.tiposTelefone}
                            placeholder='Tipo'
                            key={this.state.tiposTelefone.key}
                            onChange={this.handleSelectChange.bind(this)}
                        />
                        <Form.Input
                            type="text"
                            maxLength={11}
                            label='Telefone'
                            placeholder='Telefone'
                            onChange={this.handleChange('telefone_numero')}
                        />
                    </Form.Group>
                    <Button onClick={ () => this.adicionarTelefone() }>
                        + Adicionar Telefone
                    </Button>
                </Form.Field>
                <Form.Field>
                    <div>
                        {values.emails.map(email => (
                            <div key={email.endereco}>
                                <Label as='a' className="large rectangle">
                                    <Icon name='mail' />
                                    {email.endereco}
                                </Label>
                                <Button
                                    type="button"
                                    className="small"
                                    onClick={ () => this.removerEmail(email) }
                                >
                                    -
                                </Button>
                            </div>
                        ))}
                    </div>
                    <Form.Group inline>
                        <Form.Input
                            label='Email'
                            type='email'
                            placeholder='Email'
                            onChange={this.handleChange('endereco_email')}
                        />
                    </Form.Group>
                    <Button onClick={ () => this.adicionarEmail() }>
                        + Adicionar Email
                    </Button>
                </Form.Field>
                <Button onClick={this.back}>Voltar</Button>
                <Button
                    onClick={this.saveAndContinue}
                    disabled={this.isFormValido()}
                >
                    Continuar
                </Button>
            </Form>
        )
    }
}

