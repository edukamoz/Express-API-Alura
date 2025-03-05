// Importando a biblioteca do framework Express
import express from "express"
import conectaNaDataBase from "./config/dbConnect.js"
import routes from "./routes/index.js"

const conexao = await conectaNaDataBase()

conexao.on("error", (error) => {
    console.error("Erro de conexão", erro)
})

conexao.once("open", () => {
    console.log("Conexão com o banco feita com sucesso")
})

const app = express()
routes(app)

// ---------------- DELETE ----------------

app.delete("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id)
    livros.splice(index, 1)
    res.status(200).send("Livro removido com sucesso")
})

export default app
