package br.com.surittec.app.service;

import br.com.surittec.app.dao.ClienteDao;
import br.com.surittec.app.dao.EmailDao;
import br.com.surittec.app.dao.TelefoneDao;
import br.com.surittec.app.model.Cliente;
import br.com.surittec.app.model.Email;
import br.com.surittec.app.model.Telefone;
import br.com.surittec.app.payload.ClienteRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Transactional(rollbackFor=Exception.class)
@Service
public class ClienteService {

    @Autowired
    private ClienteDao clienteDao;

    @Autowired
    private TelefoneDao telefoneDao;

    @Autowired
    private EmailDao emailDao;


    public Boolean deletar(Integer id) {
        try {
            telefoneDao.deleteByCliente_Id(id);
            emailDao.deleteByCliente_Id(id);
            clienteDao.deleteById(id);

            return true;
        } catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

    public Boolean atualizar(Integer id, ClienteRequest cliente) {
        try {
            telefoneDao.deleteByCliente_Id(id);
            emailDao.deleteByCliente_Id(id);
            return salvar(cliente);
        } catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

    public Boolean salvar(ClienteRequest req) {

        try {
            Cliente cliente = new Cliente();

            if(req.getId() != null) {
                cliente.setId(req.getId());
            }

            cliente.setNome(req.getNome());
            cliente.setCpf(req.getCpf());
            cliente.setEndereco(req.getEndereco());
            clienteDao.save(cliente);

            Set<Telefone> telefones = req.getTelefones();
            telefones.stream().forEach(telefone -> telefone.setCliente(cliente));
            telefoneDao.saveAll(telefones);

            Set<Email> emails = req.getEmails();
            emails.stream().forEach(email -> email.setCliente(cliente));
            emailDao.saveAll(emails);

            return true;
        } catch (Exception e){
            e.printStackTrace();
            return false;
        }

    }

    public List<ClienteRequest> buscarTodos() {
        List<ClienteRequest> response = new ArrayList<ClienteRequest>();

        List<Cliente> clientes = (List<Cliente>) clienteDao.findAll();

        clientes.forEach(cliente -> {
            ClienteRequest item = new ClienteRequest();
            item.setId(cliente.getId());
            item.setCpf(cliente.getCpf());
            item.setEndereco(cliente.getEndereco());
            item.setNome(cliente.getNome());
            response.add(item);
        });

        response.stream().forEach(cliente -> cliente.setTelefones(telefoneDao.findByCliente_Id(cliente.getId())));
        response.stream().forEach(cliente -> cliente.setEmails(emailDao.findByCliente_Id(cliente.getId())));

        return response;
    }

}
