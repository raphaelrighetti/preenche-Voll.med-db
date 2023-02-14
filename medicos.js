const fs = require("fs");
const csvParser = require("csv-parser");
const axios = require("axios");

const result = [];

fs.createReadStream("./csv/ibge-fem-10000.csv")
    .pipe(csvParser())
    .on("data", data => result.push(data))
    .on("end", () => {
        for (let i = 0; i <= 99; i++) {
            const request = {
                nome:
                    result[i].nome.charAt(0).toUpperCase() +
                    result[i].nome.slice(1).toLowerCase(),
                email: `${result[i].nome.toLowerCase()}@teste.com`,
                telefone: geraTelefone(),
                crm: geraCrm(),
                especialidade: geraEspecialidade(),
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

function geraTelefone() {
    let telefone = "119";

    for (let i = 1; i <= 8; i++) {
        telefone += String(parseInt(Math.random() * 9));
    }

    return telefone;
}

function geraCrm() {
    let crm = "";

    for (let i = 1; i <= 6; i++) {
        crm += String(parseInt(Math.random() * 9));
    }

    return crm;
}

function geraEspecialidade() {
    const especialidades = [
        "ORTOPEDIA",
        "CARDIOLOGIA",
        "GINECOLOGIA",
        "DERMATOLOGIA",
    ];
    const index = parseInt(Math.random() * 3);

    return especialidades[index];
}

async function doPostRequest(request) {
    let res = await axios.post("http://localhost:8080/medicos", request);
    let data = res.data;
    console.log(data);
}
