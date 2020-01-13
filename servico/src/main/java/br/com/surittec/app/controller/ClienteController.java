package br.com.surittec.app.controller;

import br.com.surittec.app.dao.ClienteDao;
import br.com.surittec.app.payload.ClienteRequest;
import br.com.surittec.app.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "http://localhost:3000")
public class ClienteController {

    @Autowired
    private ClienteDao clienteDao;

    @Autowired
    private ClienteService service;

    @PostMapping
    public String Store(@RequestBody ClienteRequest req) {
        if(service.salvar(req)){
            return "Salvo com sucesso!";
        }else {
            return "Não foi possível salvar";
        }
    }

    @GetMapping
    public List<ClienteRequest> Index() {
        return service.buscarTodos();
    }

    @DeleteMapping("/{id}")
    public String Erase(@PathVariable("id") Integer id) {
        if(service.deletar(id)){
            return "Deletado com sucesso";
        } else {
            return "Não foi possível deletar";
        }

    }

    @PutMapping("/{id}")
    public String Update(@RequestBody ClienteRequest cliente, @PathVariable("id") Integer id) {
        if(service.atualizar(id, cliente)){
            return "Atualizado com sucesso";
        } else {
            return "Não foi possível atualizar";
        }
    }

}
 