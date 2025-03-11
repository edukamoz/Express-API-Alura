import livro from "../models/Livro.js"
import { autor } from "../models/index.js"

class LivroController {

    static async listarLivros(req, res, next) {
        try {
            const listaLivros = await livro.find({})
            res.status(200).json(listaLivros)
        } catch (erro) {
            next(erro)
        }
    }

    static async listarLivroPorId(req, res, next) {
        try {
            const id = req.params.id;

            const livroResultado = await livro.findById(id)
                .populate("autor", "nome")
                .exec();

            if (livroResultado !== null) {
                res.status(200).send(livroResultado);
            } else {
                next(new NaoEncontrado("Id do livro não localizado."));
            }
        } catch (erro) {
            next(erro);
        }
    }

    static async cadastrarLivro(req, res, next) {
        const novoLivro = req.body
        try {
            const autorEncontrado = await autor.findById(novoLivro.autor)
            const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc } }
            const livroCriado = await livro.create(livroCompleto)
            res.status(201).json({
                message: "Criado com sucesso",
                livro: livroCriado
            })
        } catch (erro) {
            next(erro)
        }
    }

    static async atualizarLivro(req, res, next) {
        try {
            const id = req.params.id;

            const livroResultado = await livro.findByIdAndUpdate(id, { $set: req.body });

            if (livroResultado !== null) {
                res.status(200).send({ message: "Livro atualizado com sucesso" });
            } else {
                next(new NaoEncontrado("Id do livro não localizado."));
            }
        } catch (erro) {
            next(erro);
        }
    }

    static async excluirLivro(req, res, next) {
        try {
            const id = req.params.id;

            const livroResultado = await livro.findByIdAndDelete(id);

            if (livroResultado !== null) {
                res.status(200).send({ message: "Livro removido com sucesso" });
            } else {
                next(new NaoEncontrado("Id do livro não localizado."));
            }
        } catch (erro) {
            next(erro);
        }
    }

    static async listarLivrosPorFiltro(req, res, next) {
        try {

            const busca = processaBusca(req.query)

            const livrosPorEditora = await livro.find(busca)

            res.status(200).json(livrosPorEditora)

        } catch (erro) {
            next(erro)
        }
    }
}

function processaBusca(parametros) {
    const { editora, titulo, minPaginas, maxPaginas } = parametros

    const busca = {}

    if (editora) busca.editora = editora
    if (titulo) busca.titulo = { $regex: titulo, $options: "i" }

    if (minPaginas || maxPaginas) busca.numeroPaginas = {}

    if (minPaginas) busca.numeroPaginas.$gte = minPaginas
    if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas

    return busca
}

export default LivroController
