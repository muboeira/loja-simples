package com.bruno.pedidos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Optional;

import com.bruno.pedidos.model.Cliente;
import com.bruno.pedidos.model.HttpResponse;
import com.bruno.pedidos.repository.ClienteRepository;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;
    
    @GetMapping("/")
    public ResponseEntity<?> listar() {
        HttpResponse response = new HttpResponse();
        response.setStatus(HttpStatus.OK);

        return new ResponseEntity<>(clienteRepository.findAll(), response.getStatus());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> listarPorId(@PathVariable("id") Long id) {
        HttpResponse response = new HttpResponse();

        try {
            Optional<Cliente> cliente = clienteRepository.findById(id);
            response.setStatus(HttpStatus.OK);
            
            return new ResponseEntity<>(cliente, response.getStatus());
        }catch(Exception e) {
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
    
            return new ResponseEntity<>(e.getMessage(), response.getStatus());
        }
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> cadastrar(@RequestBody Cliente cliente) {
        HttpResponse response = new HttpResponse();

        try {
            clienteRepository.save(cliente);
            response.setStatus(HttpStatus.CREATED);
            response.setMessage("Cliente cadastrado com sucesso.");

            return new ResponseEntity<>(response, response.getStatus());
        }catch(Exception e) {
            //talvez tratar erros com funções customizadas nos arquivos repository, ex: nome duplicado
            //response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            //response.setMessage("Erro ao cadastrar o produto " + produto.getDescricao() + ". Motivo: Produto com esse nome já existe!");

            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);

            return new ResponseEntity<>(e.getMessage(), response.getStatus());
        }
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> atualizar(@RequestBody Cliente cliente) {
        HttpResponse response = new HttpResponse();

        try {
            clienteRepository.save(cliente);
            response.setStatus(HttpStatus.OK);
            response.setMessage("Produto atualizado com sucesso.");

            return new ResponseEntity<>(response, response.getStatus());
        }catch(Exception e) {
            //talvez tratar erros com funções customizadas nos arquivos repository, ex: nome duplicado
            //response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            //response.setMessage("Erro ao cadastrar o produto " + produto.getDescricao() + ". Motivo: Produto com esse nome já existe!");

            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);

            return new ResponseEntity<>(e.getMessage(), response.getStatus());
        }
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> remover(@PathVariable("id") Long id) {
        HttpResponse response = new HttpResponse();

        try {
            clienteRepository.deleteById(id);
            response.setStatus(HttpStatus.OK);
            response.setMessage("Cliente deletado com sucesso.");

            return new ResponseEntity<>(response, response.getStatus());
        }catch(Exception e) {
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);

            return new ResponseEntity<>(e.getMessage(), response.getStatus());
        }
    }
}
