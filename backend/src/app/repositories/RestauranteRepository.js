const db = require('./../../db/models')
const { Op } = require('sequelize');

class RestauranteRepository {
    async verify(cadastrado) {
        try {
            const restaurante = await db.restaurantes.findOne({
                where: {
                    [Op.or]: [
                        { cnpj: cadastrado.cnpj },
                        { email: cadastrado.email },
                    ]
                }
            })

            const telefone = await db.telefonesRestaurante.findOne({
                where: { telefone: cadastrado.telefone }
            })

            const resultado = {
                cnpj: restaurante ? restaurante.cnpj : null,
                senha: restaurante ? restaurante.senha : null,
                email: restaurante ? restaurante.email : null,
            };
            return resultado;

        } catch (error) {
            console.error(error)
            throw new Error('Erro ao verificar os dados');
        }
    }

    async findId(email) {
        try {
            const idR = await db.restaurantes.findOne({ where: { email: email } })

            return idR.idRestaurante

        } catch (error) {
            console.error(error)
            throw new Error('Erro ao verificar os dados')
        }
    }

    async create(cadastro) {
        try {
            const telefone = cadastro.telefone
            delete cadastro.telefone
            const restaurante = await db.restaurantes.create(cadastro)
            await db.telefonesRestaurante.create({
                idRestaurante: restaurante.idRestaurante,
                telefone: telefone

            })

            return ("Estabelecimento cadstrado")

        } catch (error) {
            console.error(error)
            throw new Error('Erro ao realizar o cadastro!');
        }
    }

    /*async updateRestaurante(restaurante, idR) {
        try {            
            await db.restaurantes.update(restaurante, {
                where: { idRestaurante: idR }
            })
        
            return("Restaurante atualizado")

        } catch (error) {
            console.error(error)
            throw new Error('Não foi possível atualizar!');
        }
    }*/

    /*async updateLogo(logo, idR) {
        try {            
            const restaurante = await db.restaurantes.findByPk(idR)
            
            let imagem = await db.imagemRestaurantes.findByPk(restaurante.idImgRestaurante)
            
            if (imagem) {
                imagem.logo = logo
                await imagem.save()
                return("Logo adicionada")
            } else {
                imagem = await imagemRestaurantes.create({ logo: logo })
                restaurante.idImgRestaurante = imagem.idImgRestaurante
                await restaurante.save()
                return("Logo atualizada")
            }
        
        } catch (error) {
            console.error(error)
            throw new Error('Não foi possível atualizar!');
        }
    }*/

    /*async findById(id) {
        try {
            return await Restaurante.findOne({ where: { idRestaurante: id } });
        } catch (error) {
            console.error(error)
            throw new Error('Erro ao verificar os dados');
        }
    }*/
}

module.exports = new RestauranteRepository;
