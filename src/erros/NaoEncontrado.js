import ErroBase from "./ErroBase";

class NaoEncontrado extends ErroBase {
    constructor(mensagem = "Página não encontrada") {
        super(mensagem, 404)
    }
}

export default NaoEncontrado