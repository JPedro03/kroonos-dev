module.exports = {
    async ValidarPrestacoes(dados) {
        let dadosCorrigidos = []
        dados.forEach(dado => {
            let vlCorreto = dado.vlTotal / dado.qtPrestacoes
            let vlFixado = vlCorreto.toFixed(2)
            if (vlFixado !== dado.vlPresta)
                dadosCorrigidos.push({ vlCorrigido: vlFixado, calculoEstaCorreto: false })
            else
                dadosCorrigidos.push({ vlCorrigido: vlFixado, calculoEstaCorreto: true })
        })
        return dadosCorrigidos
    }
}