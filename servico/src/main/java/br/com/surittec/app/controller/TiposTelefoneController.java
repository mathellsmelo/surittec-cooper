package br.com.surittec.app.controller;

import br.com.surittec.app.dao.TiposTelefoneDao;
import br.com.surittec.app.model.TipoTelefone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tipos-telefone")
@CrossOrigin(origins = "http://localhost:3000")
public class TiposTelefoneController {

    @Autowired
    private TiposTelefoneDao dao;

    @GetMapping
    public List<TipoTelefone> Index() {
        return (List<TipoTelefone>) dao.findAll();
    }

}
