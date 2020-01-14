import React, { useMemo, useState, useEffect } from 'react';
import {Button, Confirm, Icon} from 'semantic-ui-react'
import DataTable from 'react-data-table-component';
import CrudModal from './modal/CRUDModal';
import api from '../../services/api'
import { getRole, logout } from '../../services/auth'
import editButton from '../../assets/editButton.png'
import deleteButton from '../../assets/deleteButton.png'
import ClienteDetails from './ClienteDetails'

import './Clientes.css';

export default function Clientes({history}) {
    const [data, setData] = useState([]);
    const [authority, setAuthority] = useState('');
    const [hide, setHide] = useState('');
    const [selectedRow, setSelectedRow] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [isCrudModalOpen, setIsCrudModalOpen] = useState(false);
    const [operacao, setOperacao] = useState('');



    useEffect(() => {
        async function loadClientes() {
            const response = await api.get('/clientes');
            setData(response.data);
            setAuthority(getRole);

        }

        loadClientes();
    }, []);

    useEffect(() => {
        async function montarTela() {
            if(authority === "ROLE_USER"){
                setHide("lg");
            } else {
                setHide("sm");
            }
        }
        montarTela();
    }, [authority]);

    function sair() {
        logout();
        history.push(`/`);
    }

    const handleEditClick = (row) => {
        setSelectedRow(row);
        setOperacao('ALTERACAO');
        setIsCrudModalOpen(true);
    }

    const handleInsertClick = () => {
        setSelectedRow({
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
        });
        setIsCrudModalOpen(true);
    }

    const handleDeleteClick = (row) => {
        setIsOpen(true);
        if(row != null){
            setSelectedRow(row);
        }
    }

    async function deleteRow(row){
        await api.delete(`/clientes/${row.id}`)
            .then(res => {
                alert("deletado com sucesso");
                window.location.reload();
            }).catch(err => {
                console.log(err);
            });
        setIsOpen(true);
    }


    const columns = useMemo(() => [
        {
            name: 'Nome',
            selector: 'nome',
            sortable: true,
        },
        {
            name: 'logradouro',
            selector: 'endereco.logradouro',
            sortable: false
        },
        {
            name: 'Cidade',
            selector: 'endereco.cidade',
            sortable: true
        },
        {
            name: 'UF',
            selector: 'endereco.uf',
            sortable: true,
            maxWidth: '7px'
        },
        {
            cell: row =>
            <div>
            {authority === "ROLE_ADMIN" &&
                <button onClick={() => handleEditClick(row)}>
                    <img src={editButton} alt="Caneta" />
                </button>
            }
		    </div>,
            allowOverflow: true,
            ignoreRowClick: true,
            button: true,
            hide: hide
        },
        {
            cell: row =>
            <div>
            {authority === "ROLE_ADMIN" &&
                <button onClick={() => handleDeleteClick(row)}>
                    <img src={deleteButton} alt="Lixeira" />
                </button>
            }
		    </div>,
            allowOverflow: true,
            ignoreRowClick: true,
            button: true,
            hide: hide
        }
    ], [hide]);

    const TableTheme = {
        highlightOnHover: true,
        rows: {
            height: '40px',
            spacing: 'spaced'
        },
    }

    return (
        <div>
            <Button onClick={sair}>
                <Icon name='sign-out' />
                Sair
            </Button>
            <DataTable
                title="Clientes"
                data={data}
                columns={columns}
                selectableRows={false}
                customTheme={TableTheme}
                highlightOnHover={true}
                pointerOnHover={true}
                responsive={true}
                pagination={true}
                expandableRows={true}
                expandableRowsComponent={<ClienteDetails />}
                expandOnRowClicked={true}
            />
            <div>
                <Confirm
                    header={"Confirmação de Exclusão"}
                    content={"Deseja realmente excluir este registro?"}
                    open={isOpen}
                    onCancel={() => setIsOpen(false)}
                    onConfirm={() => deleteRow(selectedRow)}
                />
            </div>
            {authority === "ROLE_ADMIN" &&
                <div>
                    <Button className="ui right floated button" style={{marginRight:'20px'}} onClick={handleInsertClick}>CADASTRAR NOVO CLIENTE</Button>
                    <CrudModal isOpen={isCrudModalOpen} onClose={() => setIsCrudModalOpen(false)} data={selectedRow} operacao={operacao}/>
                </div>
            }
        </div>
    );
};
