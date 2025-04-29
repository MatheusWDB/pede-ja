const app = require('./app.js')
const db = require('./db/models')

const PORT = process.env.PORT || 3000

// escutar a porta
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
