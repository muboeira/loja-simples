package com.bruno.pedidos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.bruno.pedidos.model.Cliente;
import com.bruno.pedidos.repository.ClienteRepository;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;
    
    @GetMapping
    public List<Cliente> listar() {
        return clienteRepository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Cliente cadastrar(@RequestBody Cliente cliente) {
        return clienteRepository.save(cliente); 
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Cliente atualizar(@RequestBody Cliente cliente) {
        return clienteRepository.save(cliente); 
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.CREATED)
    public List<Cliente> remover(@RequestBody Cliente cliente) {
        clienteRepository.delete(cliente);
        return clienteRepository.findAll(); 
    }
}
