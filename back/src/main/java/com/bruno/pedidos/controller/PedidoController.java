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
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.bruno.pedidos.model.HttpResponse;
import com.bruno.pedidos.model.ItemPedido;
import com.bruno.pedidos.model.Pedido;
import com.bruno.pedidos.repository.PedidoRepository;
import com.bruno.pedidos.repository.ItemPedidoRepository;

@RestController
@RequestMapping("/pedido")
public class PedidoController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ItemPedidoRepository itemPedidoRepository;

    @GetMapping("/")
    public ResponseEntity<?> listar() {
        HttpResponse response = new HttpResponse();
        response.setStatus(HttpStatus.OK);

        return new ResponseEntity<>(pedidoRepository.findAll(), response.getStatus());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> listarPorId(@PathVariable("id") Long id) {
        HttpResponse response = new HttpResponse();

        try {
            Optional<Pedido> pedido = pedidoRepository.findById(id);
            response.setStatus(HttpStatus.OK);
            
            return new ResponseEntity<>(pedido, response.getStatus());
        }catch(Exception e) {
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
    
            return new ResponseEntity<>(e.getMessage(), response.getStatus());
        }

    }

    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody Pedido pedido) {
        HttpResponse response = new HttpResponse();

        try{
            Pedido pedidoCreated = pedidoRepository.save(pedido);
            List<ItemPedido> itensPedidoCreated = pedido.getItensPedido(); 
            List<ItemPedido> itensPedido = new ArrayList<ItemPedido>();
            for (ItemPedido itemPedido : itensPedidoCreated) {
                itemPedido.setPedido(pedidoCreated);
                itensPedido.add(itemPedido);
            }
            itemPedidoRepository.saveAll(itensPedido);

            response.setStatus(HttpStatus.CREATED);
            response.setMessage("Pedido cadastrado com sucesso.");

            return new ResponseEntity<>(response, response.getStatus());
        }catch(Exception e) {
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);

            return new ResponseEntity<>(e.getMessage(), response.getStatus());
        }
    }

    @PutMapping
    public ResponseEntity<?> atualizar(@RequestBody Pedido pedido) {
        HttpResponse response = new HttpResponse();

        try {
            Pedido pedidoCreated = pedidoRepository.save(pedido);
            List<ItemPedido> itensPedidoCreated = pedido.getItensPedido(); 
            List<ItemPedido> itensPedido = new ArrayList<ItemPedido>();
            for (ItemPedido itemPedido : itensPedidoCreated) {
                itemPedido.setPedido(pedidoCreated);
                itensPedido.add(itemPedido);
            }
            itemPedidoRepository.saveAll(itensPedido);

            response.setStatus(HttpStatus.OK);
            response.setMessage("Pedido atualizado com sucesso.");

            return new ResponseEntity<>(response, response.getStatus());
        }catch(Exception e) {
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);

            return new ResponseEntity<>(e.getMessage(), response.getStatus());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> remover(@PathVariable("id") Long id) {
        HttpResponse response = new HttpResponse();

        try {
            itemPedidoRepository.deleteByIdPedido(id);
            pedidoRepository.deleteById(id);
            response.setStatus(HttpStatus.OK);
            response.setMessage("Pedido deletado com sucesso.");

            return new ResponseEntity<>(response, response.getStatus());
        }catch(Exception e) {
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);

            return new ResponseEntity<>(e.getMessage(), response.getStatus());
        }
    }
}
