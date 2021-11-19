package com.bruno.pedidos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.bruno.pedidos.model.Produto;
import com.bruno.pedidos.repository.ProdutoRepository;

@RestController
@RequestMapping("/produto")
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtoRepository;
    
    @GetMapping("/")
    public List<Produto> listar() {
        return produtoRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Produto> listarPorId(@PathVariable("id") Long id) {
        Optional<Produto> produto = produtoRepository.findById(id);
        return produto;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Produto cadastrar(@RequestBody Produto produto) {
        return produtoRepository.save(produto); 
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Produto atualizar(@RequestBody Produto produto) {
        return produtoRepository.save(produto); 
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Produto> remover(@PathVariable("id") Long id) {
        produtoRepository.deleteById(id);
        return produtoRepository.findAll(); 
    }
}
