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

import com.bruno.pedidos.model.HttpResponse;
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
    public ResponseEntity<?> cadastrar(@RequestBody Produto produto) {
        HttpResponse response = new HttpResponse();

        Produto novoProduto = produtoRepository.save(produto);
        if(novoProduto.getId() > 0) {
            response.setStatus(HttpStatus.CREATED);
            response.setMessage("Produto cadastrado com sucesso.");
        }else {
            //tratar erros, ex: nome duplicado
            //response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            //response.setMessage("Erro ao cadastrar o produto " + produto.getDescricao() + ". Motivo: Produto com esse nome já existe!");
        }

        return new ResponseEntity<>(response, response.getStatus());
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
