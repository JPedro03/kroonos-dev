async function VerificarCpfCnpj(dados) {
    let cpf = [];
    let cnpj = [];

    dados.forEach(async d => {
        if(d.nrCpfCnpj){
            if(d.nrCpfCnpj.length === 11){
                if(await ValidarCPF(d.nrCpfCnpj))
                    cpf.push(d.nrCpfCnpj)
                return;
            }
            if(d.nrCpfCnpj.length === 14){
                if(await ValidarCNPJ(d.nrCpfCnpj))
                    cnpj.push(d.nrCpfCnpj)
                return;
            }
        }
    });

    return [cpf, cnpj]
}

async function ValidarCPF(dadoCpf) {
    let cpf = dadoCpf.replace(/[^\d]/g, '');

    if (/^(\d)\1{10}$/.test(dadoCpf)) return false;

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) 
        resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) 
        return false;

    soma = 0;

    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) 
        resto = 0;

    if (resto !== parseInt(cpf.charAt(10))) 
        return false;

    return true;       
}

async function ValidarCNPJ(cnpj) {
    const numerosVerificação = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    
    const cnpj = String(cnpj).replace(/[^\d]/g, '');
    if (/0{14}/.test(cnpj)) 
        return false;

    let soma = 0;
    for (let i = 0; i < 12; i++) {
        soma += cnpj[i] * numerosVerificação[++i];
    }
    if (cnpj[12] != ((soma %= 11) < 2 ? 0 : 11 - soma)) 
        return false;

    soma = 0;
    for (let i = 0; i <= 12; i++) {
        soma += cnpj[i] * numerosVerificação[i];
    }
    if (cnpj[13] != ((soma %= 11) < 2 ? 0 : 11 - soma)) 
        return false;

    return true;
}

module.exports = {VerificarCpfCnpj}