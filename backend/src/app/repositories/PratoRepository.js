const db = require('./../../db/models')

class PratoRepository {
    async findAll(idR) {
        try {
            return await db.pratos.findAll({
                where: { idRestaurante: idR },
                include: [
                    { model: db.ingredientes },
                    { model: db.imagemPratos }
                ]
            })

        } catch (error) {
            console.error(error)
            throw new Error('Não foi possível localizar!');
        }
    }

    async create(prato, idR) {
        try {
            prato = { ...prato, idRestaurante: idR }
            let novoPrato = {}

            if (prato.imagem !== null) {
                const imagem = await db.imagemPratos.create({ imagem: prato.imagem })
                prato = { ...prato, idImgPrato: imagem.idImgPrato }
                novoPrato = await db.pratos.create(prato)
            } else {
                delete prato.imagem
                console.log(prato)
                novoPrato = await db.pratos.create(prato)
            }

            for (let i = 0; i < prato.ingredientes.length; i++) {
                let [novoIngrediente] = await db.ingredientes.findOrCreate({
                    where: { ingrediente: prato.ingredientes[i] }
                })
                await db.pratoIngredientes.create({
                    idPrato: novoPrato.idPrato,
                    idIngrediente: novoIngrediente.idIngrediente
                })
            }

            return ("Prato adicionado")

        } catch (error) {
            console.error(error)
            throw new Error('Não foi possível cadastrar!');
        }
    }

    async update(prato, idPr) {
        try {

            const pratoExistente = await db.pratos.findOne({ where: { idPrato: idPr } });

            if (pratoExistente && pratoExistente.idImgPrato) {
                await db.imagemPratos.destroy({ where: { idImgPrato: pratoExistente.idImgPrato } });
            }

            if (prato.imagem) {
                const imagem = await db.imagemPratos.create({ imagem: prato.imagem });

                await db.pratos.update({ idImgPrato: imagem.idImgPrato }, {
                    where: { idPrato: idPr }
                });
            }

            await db.pratos.update(prato, {
                where: { idPrato: idPr }
            })
            await db.pratoIngredientes.destroy({
                where: { idPrato: idPr }
            })

            for (let i = 0; i < prato.ingredientes.length; i++) {
                let [ingrediente, created] = await db.ingredientes.findOrCreate({
                    where: { ingrediente: prato.ingredientes[i] },
                    defaults: { ingrediente: prato.ingredientes[i] }
                });

                if (!created) {
                    await ingrediente.update({ ingrediente: prato.ingredientes[i] });
                }

                await db.pratoIngredientes.upsert({
                    idPrato: idPr,
                    idIngrediente: ingrediente.idIngrediente
                });
            }

            return ("Prato atualizado")

        } catch (error) {
            console.error(error)
            throw new Error('Não foi possível atualizar!');
        }
    }

    async delete(idPr) {
        try {
            const idImg = await db.pratos.findOne({ where: { idPrato: idPr } })
            await db.pratos.destroy({ where: { idPrato: idPr } })
            if (idImg) await db.imagemPratos.destroy({ where: { idImgPrato: idImg.idImgPrato } })

            return ("Prato deletado")

        } catch (error) {
            console.error(error)
            throw new Error('Não foi possível deletar!');
        }
    }

    /*async findById(idPr) {
        try {
            return await db.pratos.findOne({
                where: { idPrato: idPr },
                include: [
                    {model: db.ingredientes},
                    {model: db.imagemPratos}
                ]
              })

        } catch (error) {
            console.error(error)
            throw new Error('Não foi possível localizar!');
        }
    }*/
}

module.exports = new PratoRepository()
