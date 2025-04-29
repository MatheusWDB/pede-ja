const db = require('./../../db/models')

class PedidoRepository {
    async findAll(idR) {
        try {
            return await db.pedidos.findAll({
                include: [
                    {
                        model: db.clientes
                    },
                    {
                        model: db.pratos,
                        where: { idRestaurante: idR },
                        through: {
                            model: db.pedidoPratos
                        },
                        include: {
                            model: db.ingredientes
                        }
                    }
                ]
            })

        } catch (error) {
            console.error(error);
            throw new Error('Erro ao verificar os dados');
        }
    }

    /*async delete(idR) {
        try {
            await db.pedidos.destroy({
                include: [{
                    model: db.pratos,
                    where: { idRestaurante: idR }
                }],
                where: { finalizado: 'V' } 
            })

        } catch (error) {
            console.error(error)
            throw new Error('Não foi possível deletar!');
        }
    }*/

    async findById(idP) {
        try {
            return await db.pedidos.findOne({
                include: [
                    {
                        model: db.clientes
                    },
                    {
                        model: db.pratos,
                        through: {
                            model: db.pedidoPratos
                        },
                        include: {
                            model: db.ingredientes
                        }
                    }
                ],
                where: { idPedido: idP }
            })
        } catch (error) {
            console.error(error)
            throw new Error('Não foi possível localizar!');
        }
    }

    async update(idP) {
        try {
            const pedido = await db.pedidos.findOne({
                include: {
                    model: db.pratos
                },
                where: { idPedido: idP }
            })
            pedido.finalizado = pedido.finalizado === 'V' ? 'F' : 'V';
            await pedido.save();

            return ('Pedido atualizado')

        } catch (error) {
            console.error(error)
            throw new Error('Não foi possível atualizar!');
        }
    }

    async deleteById(idP) {
        try {
            const pedido = await db.pedidos.findOne({
                include: {
                    model: db.pratos
                },
                where: {
                    idPedido: idP,
                    finalizado: 'V'
                }
            })

            if (pedido) {
                await pedido.destroy()
                return ("Pedido deletado")
            } else {
                return ("Pedido não finalizado")
            }

        } catch (error) {
            console.error(error)
            throw new Error('Erro ao deletar!');
        }
    }

    async create(pedido, idR) {
        try {
            // Inserir cliente se não existir
            let [cliente, created] = await db.clientes.findOrCreate({
                where: {
                    nome: pedido[0].nome,
                    telefone: pedido[0].telefone
                },
                defaults: {
                    nome: pedido[0].nome,
                    telefone: pedido[0].telefone,
                    mesa: pedido[0].mesa
                }
            });

            if (!created) {
                cliente.mesa = pedido[0].mesa
                await cliente.save()
            }

            const lastPedido = await db.pedidos.findOne({
                include: [{
                    model: db.pratos,
                    where: { idRestaurante: idR }
                }],
                order: [['numeroPedido', 'DESC']]

            });

            const numeroPedido = lastPedido ? lastPedido.numeroPedido + 1 : 1;

            console.log(lastPedido)
            // Inserir novo pedido
            let novoPedido = await db.pedidos.create({
                idCliente: cliente.idCliente,
                numeroPedido
            });

            // Inserir detalhes do pedido na tabela PedidoPrato
            for (let i = 1; i < pedido.length; i++) {
                await db.pedidoPratos.create({
                    idPedido: novoPedido.idPedido,
                    idPrato: pedido[i].idPrato,
                    quantidade: pedido[i].quantidade,
                    observacao: pedido[i].observacao
                });
            }

            return ('Pedido realizado')

        } catch (error) {
            console.error(error)
            throw new Error('Não foi possível realizar o pedido!');
        }
    }
}

module.exports = new PedidoRepository()
