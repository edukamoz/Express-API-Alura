import mongoose from "mongoose";
import { autorSchema } from "./Autor.js"

const livroSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: {
        type: String,
        required: [true, "O título do livro é obrigatório"]
    },
    autor: autorSchema,
    editora: {
        type: String,
        required: [true, "A editora é obrigatória"],
        enum: {
            values: ["Casa do código", "Alura"],
            message: "A editora {VALUE} não é um valor permitido"
        }
    },
    preco: { type: Number },
    numeroPaginas: {
        type: Number,
        validate: {
            validator: (valor) => {
                return valor >= 10 && valor <= 5000
            },
            message: "O número de páginas de estar entre 10 e 5000. Valor fornecido: {VALUE}"
        }
    }
}, { versionKey: false })

const livro = mongoose.model("livros", livroSchema)

export default livro
