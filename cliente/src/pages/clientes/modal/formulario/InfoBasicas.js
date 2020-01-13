import React, { Component } from 'react';
import { Form, Button, Input } from 'semantic-ui-react';
import { InputMask } from 'primereact/inputmask';

export default class InfoBasicas extends Component{

    saveAndContinue = (e) => {
        e.preventDefault()
        this.props.nextStep()
    }


    render(){
        const { values } = this.props;
        return(
            <Form >
                <h1 className="ui centered">Digite as Informações Básicas</h1>
                <Form.Field>
                    <label>Nome</label>
                    <Input
                        placeholder='Nome'
                        onChange={this.props.handleChange('nome')}
                        defaultValue={values.nome}
                        maxLength="100"
                        minLength="3"
                    />
                </Form.Field>
                <Form.Field>
                    <label>CPF</label>
                    <InputMask
                        type="text"
                        mask="999.999.999-99"
                        placeholder='CPF'
                        defaultValue={values.cpf}
                        value={this.props.values.cpf}
                        unmask={true}
                        onChange={this.props.handleChange('cpf')}
                        maxlength={11}
                        minlength={11}
                    />
                </Form.Field>
                <Button
                    onClick={this.saveAndContinue}
                    disabled={
                        !values.nome ||
                        !values.cpf
                    }
                >
                    Continuar
                </Button>
            </Form>
        )
    }
}

