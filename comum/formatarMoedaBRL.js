
module.exports = {
    async FormatarNumeros(dados) {
        let numParaFormatar = await dados.flatMap(dado => Object.entries(dado).filter(([chave]) => chave.includes('vl')).map(([, valor]) => ({ valor })));
        let valoresFormatados = []
        const formatoBRL = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });

        numParaFormatar.forEach(num => {
            valoresFormatados.push(formatoBRL.format(num.valor));
        });

        return valoresFormatados;
    }
}
