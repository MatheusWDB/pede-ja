const RestauranteRepository = require('../repositories/RestauranteRepository.js')

class RestauranteController {
    async register(req, res) {
        const cadastro = req.body
        const verificar = await RestauranteRepository.verify(cadastro)
        if (verificar) {
            if (verificar.cnpj === cadastro.cnpj) {
                return res.status(400).json({ Erro: 'Cnpj já cadastrado!' })
            }
            if (verificar.email === cadastro.email) {
                return res.status(400).json({ Erro: 'Email já cadastrado!' })
            }
            if (verificar.telefone === cadastro.telefone) {
                return res.status(400).json({ Erro: 'Telefone já cadastrado!' })
            }
        }
        await RestauranteRepository.create(cadastro)

        res.status(200).json('Estabelecimento cadastrado')
    }

    async login(req, res) {
        const login = {  email: req.body.email, senha: req.body.senha,  telefone: null, cnpj: null }
        const verificar = await RestauranteRepository.verify(login)
        console.log(verificar)
        if (verificar.email !== login.email) {
            return res.status(400).json({ Erro: 'Email não cadastrado!' })
        } else if (login.senha !== verificar.senha) {
            return res.status(401).json({ Erro: 'Senha incorreta!' })
        }

        const idR = await RestauranteRepository.findId(login.email)
        res.status(202).json({ idRestaurante: idR })
    }

    /*async recover(req, res){
        const cnpj = { cnpj: req.body.cnpj, senha: null, email: null, telefone: null}
        const verificar = await RestauranteRepository.verify(cnpj)

        if (verificar.cnpj === null) {
            return res.status(400).json({Erro: 'Cnpj não cadastrado!'})
        }

        res.status(200).json(verificar.email)
    }
        
    async logout(req, res){
        blacklist.push(req.headers['x-access-token'])
        res.status(200).end()
    }

    async updateRestaurante(req, res) {  
        const idR = req.params.idR
        const restaurante = req.body
        const resposta = await RestauranteRepository.updateRestaurante(restaurante, idR)
        res.status(200).json(resposta)
    }

    async updateLogo(req, res) {
        const idR = req.params.idR
        const logo = req.body
        const resposta = await RestauranteRepository.updateLogo(logo, idR)
        res.status(200).json(resposta)
    }
    
    async show(req, res){
        const id = req.params.idR
        const row = await RestauranteRepository.findById(id)
        res.status(200).json(row)
    }*/
}

module.exports.class = new RestauranteController()
