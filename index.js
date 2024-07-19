import fs from 'fs'
import csv from 'csv-parser'
const filePath = './data/data.csv'

const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(parseFloat(value))
}

const validateCpf = (cpf) => {
    if (!cpf) {
        return false
    }

    if (
        cpf.length !== 11 ||
        cpf === '00000000000' ||
        cpf === '11111111111' ||
        cpf === '22222222222' ||
        cpf === '33333333333' ||
        cpf === '44444444444' ||
        cpf === '55555555555' ||
        cpf === '66666666666' ||
        cpf === '77777777777' ||
        cpf === '88888888888' ||
        cpf === '99999999999'
    ) {
        return false
    }

    return true
}

const validateCnpj = (cnpj) => {
    if (!cnpj) {
        return false
    }

    if (
        cnpj.length !== 14 ||
        cnpj === '00000000000000' ||
        cnpj === '11111111111111' ||
        cnpj === '22222222222222' ||
        cnpj === '33333333333333' ||
        cnpj === '44444444444444' ||
        cnpj === '55555555555555' ||
        cnpj === '66666666666666' ||
        cnpj === '77777777777777' ||
        cnpj === '88888888888888' ||
        cnpj === '99999999999999'
    ) {
        return false
    }
    return true
}

const processCSV = (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => {
                const vlTotal = parseFloat(data.vlTotal);
                const qtPrestacoes = parseInt(data.qtPrestacoes);
                const vlPresta = parseFloat(data.vlPresta);

                const calculatedPresta = (vlTotal / qtPrestacoes)
                const prestaCheck = calculatedPresta.toFixed(2) === vlPresta.toFixed(2);
                data.prestaCheck = prestaCheck

                data.vlTotal = formatCurrency(vlTotal)
                data.vlPresta = formatCurrency(vlPresta)
                data.vlMora = formatCurrency(data.vlMora)

                const isValidCpfCnpj = validateCpf(data.nrCpfCnpj) || validateCnpj(data.nrCpfCnpj);
                data.isValidCpfCnpj = isValidCpfCnpj

                results.push(data)
            })
            .on('end', () => {
                resolve(results)
            })
            .on('error', err => {
                reject(err)
            })

    })
}

processCSV(filePath)
    .then((results) => console.log(results))
    .catch(console.error)

