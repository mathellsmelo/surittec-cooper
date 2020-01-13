import React from 'react';
import { Label, Icon, Container, Card, List } from 'semantic-ui-react';
import { mascaraCpf, mascaraCep, mascaraTelefone } from '../../services/mask'

const ClienteDetails = ({ data }) => {
    return (
        <div>
            <Card>
                <Card.Content>
                    <Card.Header>{data.nome}</Card.Header>
                    <Card.Meta>
                        <span>{mascaraCpf(data.cpf)}</span>
                    </Card.Meta>
                    <Card.Description>
                        <Container>
                            <Label className='large rectangle'>
                                <Icon name='location arrow' />
                                Endereço:
                            </Label>
                            <List>
                                <List.Item>
                                    <List.Icon name='marker' />
                                    <List.Content> {data.endereco.logradouro} - {data.endereco.bairro} </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Icon name='building' />
                                    <List.Content> {data.endereco.cidade}, {data.endereco.uf} </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Icon name='zip' />
                                    <List.Content>{mascaraCep(data.endereco.cep)}</List.Content>
                                </List.Item>
                                {data.endereco.complemento &&
                                    <List.Item>
                                        <List.Icon name='plus circle' />
                                        <List.Content> {data.endereco.complemento} </List.Content>
                                    </List.Item>
                                }
                            </List>
                        </Container>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Label>
                        <Icon name='phone' />
                        Telefones:
                    </Label>
                    <List>
                    {data.telefones.map((telefone, i) => (
                        <div key={i} className='inline'>
                            {telefone.tipo.id === 1 &&
                                <List.Item>
                                    <List.Icon name='mobile alternate'/>
                                    {mascaraTelefone(telefone.numero)}
                                </List.Item>
                            }
                            {telefone.tipo.id === 2 &&
                                <List.Item>
                                    <List.Icon name='home' />
                                    {mascaraTelefone(telefone.numero)}
                                </List.Item>
                            }
                            {telefone.tipo.id === 3 &&
                                <List.Item>
                                    <List.Icon name='building outline' />
                                    {mascaraTelefone(telefone.numero)}
                                </List.Item>
                            }
                        </div>
                    ))}
                    </List>
                </Card.Content>
                <Card.Content extra>
                    <Label className='title'>
                        <Icon name='mail' />
                        Emails:
                    </Label>
                    <List>
                        {data.emails.map((email, i) => (
                            <List.Item key={i}>
                                <List.Icon name='address book' />
                                {email.endereco}
                            </List.Item>
                        ))}
                    </List>
                </Card.Content>
            </Card>
        </div>
    )
}

export default ClienteDetails;

