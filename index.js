const { LerDadosCSV } = require('./comum/lerDados');
const { VerificarCpfCnpj } = require('./comum/validarCpfCnpj');
const { FormatarNumeros } = require('./comum/formatarMoedaBRL');
const { ValidarPrestacoes } = require('./comum/validarPrestacoes');
(async () => {
    try{
        let dados = await LerDadosCSV();
        console.log('Dados captados e formatados');
        let cpfCnpj = await VerificarCpfCnpj(dados);
        console.log(`CPFs válidos: ${cpfCnpj[0].length}, CNPJs válidos: ${cpfCnpj[1].length}`)
        let valoresCorretos = await ValidarPrestacoes(dados);
        console.log(valoresCorretos);
        let numerosFormatados = await FormatarNumeros(dados);
        console.log(numerosFormatados)
    }
    catch(ex){
        console.error(ex);
    }
})()
