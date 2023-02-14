const fs = require("fs");
const csvParser = require("csv-parser");
const axios = require("axios");

const result = [];

fs.createReadStream("./csv/ibge-mas-10000.csv")
    .pipe(csvParser())
    .on("data", data => result.push(data))
    .on("end", () => {
        for (let i = 0; i <= 99; i++) {
            const request = {
                nome:
                    result[i].nome.charAt(0).toUpperCase() +
                    result[i].nome.slice(1).toLowerCase(),
                email: `${result[i].nome.toLowerCase()}@teste.com`,
                cpf: geraCpf(),
                telefone: geraTelefone(),
                endereco: {
                    logradouro: "logradouro",
                    bairro: "bairro",
                    cep: 12345678,
                    cidade: "cidade",
                    uf: "uf",
                    numero: 1,
                    complemento: "perto do habibs",
                },
            };

            console.log(JSON.stringify(request));
            doPostRequest(request).catch(e => console.log(e));
        }
    });

function geraCpf() {
    let cpf = "";

    for (let j = 1; j <= 11; j++) {
        cpf += String(parseInt(Math.random() * 9));
    }

    return cpf;
}

function geraTelefone() {
    let telefone = "119";

    for (let j = 1; j <= 8; j++) {
        telefone += String(parseInt(Math.random() * 9));
    }

    return telefone;
}

async function doPostRequest(request) {
    let res = await axios.post("http://localhost:8080/pacientes", request);
    let data = res.data;
    console.log(data);
}
