const PratoRepository = require('../repositories/PratoRepository.js')

class PratoController {
    async list(req, res) {
        const idR = req.params.idR
        let pratos = await PratoRepository.findAll(idR)
        pratos = pratos.map(pratos => {
            let ingredientes = pratos.ingredientes.reduce((acc, ingrediente) => {
                acc.push(ingrediente.ingrediente
                );
                return acc;
            }, []);
            let imagemData = null;
            if (pratos.imagemPrato && pratos.imagemPrato.imagem) {
                imagemData = pratos.imagemPrato.imagem.toString()
            }
            return {
                idPrato: pratos.idPrato,
                nome: pratos.nome,
                valor: pratos.valor,
                ingredientes: ingredientes,
                imagem: imagemData
            }
        })
        res.status(200).json(pratos)
    }

    async store(req, res) {
        const idR = req.params.idR
        const prato = req.body
        const resposta = await PratoRepository.create(prato, idR)

        res.status(201).send(resposta)
    }

    async update(req, res) {
        const idPr = req.params.idPr
        const prato = req.body
        const resposta = await PratoRepository.update(prato, idPr)
        res.status(200).send(resposta)
    }

    async delete(req, res) {
        const idPr = req.params.idPr
        const resposta = await PratoRepository.delete(idPr)
        res.status(202).send(resposta)
    }

    /*async show(req, res) {
        const idPr = req.params.idPr
        let prato = await PratoRepository.findById(idPr)
        function mapearPrato() {
            let ingredientes = prato.ingredientes.reduce((acc, ingrediente) => {
                acc.push( ingrediente.ingrediente
                );
                return acc;
            }, []);
            let imagemData = null;
            if (prato.imagemPrato && prato.imagemPrato.imagem) {
                imagemData = prato.imagemPrato.imagem.toString();
            }
            return {
                idPrato: prato.idPrato,
                nome: prato.nome,
                valor: prato.valor,
                imagem: prato.imagem,
                ingredientes: ingredientes,
                imagem: imagemData
            }
        }

        prato = mapearPrato(prato)
        res.status(200).json(prato)
    }*/
}

module.exports = new PratoController()
