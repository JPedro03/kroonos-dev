const fs = require('fs');
const csvParse = require('csv-parser');

module.exports = {
    async LerDadosCSV() {
        let result = [];
        await new Promise((resolve, reject) => {
            fs.createReadStream('./data.csv')
                .pipe(csvParse())
                .on('data', (data) => result.push(data))
                .on('end', () => {
                    resolve(result);
                })
                .on('error', (err) => {
                    reject(err)
                })
        })
        return result;
    }
}