const PedidoRepository = require('../repositories/PedidoRepository.js')

class PedidoController {
    async list(req, res) {
        const idR = req.params.idR
        let pedidos = await PedidoRepository.findAll(idR)

        pedidos = pedidos.map(pedido => {
            let valorTotal = 0;
            let pratos = pedido.pratos.map(prato => {
                valorTotal += parseFloat(prato.valor * prato.pedidoPratos.quantidade);
                return {
                    nome: prato.nome,
                    valor: prato.valor,
                    imagem: prato.imagem,
                    quantidade: prato.pedidoPratos.quantidade,
                    observacao: prato.pedidoPratos.observacao
                }
            })
            return {
                idPedido: pedido.idPedido,
                numeroPedido: pedido.numeroPedido,
                finalizado: pedido.finalizado,
                cliente: pedido.cliente.nome,
                telefone: pedido.cliente.telefone,
                mesa: pedido.cliente.mesa,                
                pratos: pratos,
                valorTotal: valorTotal.toFixed(2)
            }
        })
        res.status(200).json(pedidos)
    }

    /*async show(req, res) {
         const idP = req.params.idP
         let pedido = await PedidoRepository.findById(idP)
         let valorTotal = 0
 
         pedido = {
             idPedido: pedido.idPedido,
             numeroPedido: pedido.numeroPedido,
             finalizado: pedido.finalizado,
             createdAt: pedido.createdAt.toISOString().split('T')[1].split('.')[0],
             cliente: {
                 nome: pedido.cliente.nome,
                 telefone: pedido.cliente.telefone,
                 mesa: pedido.cliente.mesa
             },
             pratos: pedido.pratos.map(prato => {
                 valorTotal += parseFloat(prato.valor * prato.pedidoPratos.quantidade);
                 return {
                     nome: prato.nome,
                     valor: prato.valor,
                     imagem: prato.imagem,
                     quantidade: prato.pedidoPratos.quantidade,
                     observacao: prato.pedidoPratos.observacao,
                     ingredientes: prato.ingredientes.map(ingrediente => ingrediente.ingrediente)
                 }
             }),
             valorTotal: valorTotal.toFixed(2)
         };
         res.status(200).json(pedido)
     }*/

    async update(req, res) {
        const idP = req.params.idP
        const resposta = await PedidoRepository.update(idP)
        res.status(200).send(resposta)
    }

    async deleteById(req, res) {
        const idP = req.params.idP
        const resposta = await PedidoRepository.deleteById(idP)
        res.status(202).send(resposta)
    }

    async store(req, res) {
        const pedido = req.body
        const idR = req.params.idR
        await PedidoRepository.create(pedido, idR)
        res.status(201).send("Pedido realizado com sucesso!")
    }

    /*async delete(req, res) {
        const idR = req.params.idR
        await PedidoRepository.delete(idR)
        res.status(202).send("Todos os pedidos finalizados foram deletados!")        
    }*/
}

module.exports = new PedidoController()
