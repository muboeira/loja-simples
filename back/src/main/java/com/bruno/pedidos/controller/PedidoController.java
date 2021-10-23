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
import com.bruno.pedidos.model.Pedido;
import com.bruno.pedidos.repository.PedidoRepository;

@RestController
@RequestMapping("/pedido")
public class PedidoController {

    @Autowired
    private PedidoRepository pedidoRepository;
    
    @GetMapping
    public List<Pedido> listar() {
        return pedidoRepository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Pedido cadastrar(@RequestBody Pedido pedido) {
        return pedidoRepository.save(pedido); 
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Pedido atualizar(@RequestBody Pedido pedido) {
        return pedidoRepository.save(pedido); 
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.CREATED)
    public List<Pedido> remover(@RequestBody Pedido pedido) {
        pedidoRepository.deleteById(pedido.getId());
        return pedidoRepository.findAll(); 
    }
}
