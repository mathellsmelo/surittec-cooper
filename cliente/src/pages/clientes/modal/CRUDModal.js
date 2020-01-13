import React, { useState } from 'react'
import { Modal, Button } from 'semantic-ui-react'
import MainForm from './formulario/MainForm';


export default function CrudModal ({isOpen, onClose, data, operacao}){
    const [dimmer] = useState('blurring');

    return (
        <div>
            <Modal dimmer={dimmer} open={isOpen} onClose={onClose}>
                <Modal.Header>CADASTRO DE CLIENTES</Modal.Header>
                <Modal.Content>
                    <MainForm data={data} operacao={operacao} />
                </Modal.Content>
                    <Modal.Actions>
                        <Button color='red' onClick={onClose}>
                            Cancelar
                        </Button>
                    </Modal.Actions>
            </Modal>
        </div>
    )
}
