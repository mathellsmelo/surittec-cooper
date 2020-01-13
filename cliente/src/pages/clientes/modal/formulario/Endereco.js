import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { InputMask } from 'primereact/inputmask';
import { retirarFormatacao } from '../../../../services/mask'
import axios from 'axios';


export default class Endereco extends Component{
    constructor() {
        super();
        this.buscaCep = this.buscaCep.bind(this);
    }
    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    async buscaCep () {
        const cep = retirarFormatacao(document.getElementById('cep').value);
        if(cep.length === 8){
            const response = await axios.get( `http://viacep.com.br/ws/${cep}/json/`)

            if(response.status === 200){
                var bairro = document.getElementById("bairro");
                this.setNativeValue(bairro, response.data.bairro)
                bairro.dispatchEvent(new Event('input', { bubbles: true }));

                var cidade = document.getElementById("cidade");
                this.setNativeValue(cidade, response.data.localidade)
                cidade.dispatchEvent(new Event('input', { bubbles: true }));

                var logradouro = document.getElementById("logradouro");
                this.setNativeValue(logradouro, response.data.logradouro)
                logradouro.dispatchEvent(new Event('input', { bubbles: true }));

                var uf = document.getElementById("uf");
                this.setNativeValue(uf, response.data.uf)
                uf.dispatchEvent(new Event('input', { bubbles: true }));

                var complemento = document.getElementById("complemento");
                this.setNativeValue(complemento, response.data.complemento)
                complemento.dispatchEvent(new Event('input', { bubbles: true }));

            }

        }
    }

    setNativeValue(element, value) {
        console.log(element + ':' + value);
        const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
        const prototype = Object.getPrototypeOf(element);
        const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;

        if (valueSetter && valueSetter !== prototypeValueSetter) {
            prototypeValueSetter.call(element, value);
        } else {
            valueSetter.call(element, value);
        }
    }

    render(){
        const { values } = this.props;
        return(
            <Form color='blue' >
                <h1 className="ui centered">Digite o endereço do cliente</h1>
                <Form.Field>
                    <label>CEP</label>
                    <InputMask
                        id='cep'
                        name='cep'
                        type="text"
                        mask="99.999-999"
                        placeholder='CEP'
                        defaultValue={values.cep}
                        value={this.props.values.cep}
                        unmask={true}
                        onChange={this.props.handleEnderecoChange('cep')}
                        onComplete={this.buscaCep}
                        maxlength={7}
                        minlength={7}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Logradouro</label>
                    <input id='logradouro'
                           placeholder='Logradouro'
                           onChange={this.props.handleEnderecoChange('logradouro')}
                           defaultValue={values.logradouro}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Bairro</label>
                    <input id='bairro'
                           placeholder='Bairro'
                           onChange={this.props.handleEnderecoChange('bairro')}
                           defaultValue={values.bairro}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Cidade</label>
                    <input id='cidade'
                           placeholder='Cidade'
                           onChange={this.props.handleEnderecoChange('cidade')}
                           defaultValue={values.cidade}
                    />
                </Form.Field>
                <Form.Field>
                    <label>UF</label>
                    <input id='uf'
                           placeholder='UF'
                           onChange={this.props.handleEnderecoChange('uf')}
                           defaultValue={values.uf}
                           maxLength="2"
                    />
                </Form.Field>
                <Form.Field>
                    <label>Complemento</label>
                    <input id='complemento'
                           placeholder='Complemento'
                           onChange={this.props.handleEnderecoChange('complemento')}
                           defaultValue={values.complemento}
                    />
                </Form.Field>
                <Button onClick={this.back}>Voltar</Button>
                <Button
                    onClick={this.saveAndContinue}
                    disabled={
                        !values.cep ||
                        !values.bairro ||
                        !values.cidade ||
                        !values.logradouro ||
                        !values.uf
                    }
                >
                    Continuar
                </Button>
            </Form>
        )
    }
}
