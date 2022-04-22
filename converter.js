const axios = require("axios");
const fs = require("fs");

function getData(infos, evt) {
    if (infos[2].trim() == "")
        evt.sender.send("reply", "URL is empty");

    if (infos[2].startsWith("https://")) {
        axios.get(infos[2])
        .then(res => {
            if (res.status == 200) {
                infos[2] = res.data;
                convert(infos, evt);
            } else {
                evt.sender.send("reply", `Server returned status ${res.status}`);
            }
        })
        .catch(error => {
            evt.sender.send("reply", error);
        });
    } else {
        convert(infos, evt);
    }
}

function convert(infos, evt) {
    let metaJson = infos[0];
    let mapJson = infos[1];
    infos[3] = infos[3] / 1000;

    let format = infos[2].split(",");
    format.shift() // Remover o ID da música do roblox

    // Converter cada uma das notas para o vulkan e por no array _notes
    try {
        for (let i = 0; i < format.length; i++) {
            let formatedNote = format[i].split("|");
            let x = parseFloat(formatedNote[0]) - 1;
            let y = parseFloat(formatedNote[1]) - 1;
            let ms = (parseFloat(formatedNote[2]) + infos[3] * 1000) / 1000;

            mapJson["_notes"].push({ _time: ms, _x: x, _y: y });
        }
    } catch (err) {
        return evt.sender.send("reply", `Invalid map data!`);
    }

    // Transforma em json
    let toJsonMap = JSON.stringify(mapJson);
    let toJsonMeta = JSON.stringify(metaJson);

    if (!fs.existsSync("./maps")) {
        fs.mkdirSync("./maps");
    }

    // Criar arquivos
    try {
        fs.writeFileSync("./maps/converted.json", toJsonMap);
        fs.writeFileSync("./maps/meta.json", toJsonMeta);
        
        evt.sender.send("reply", `DONE!\n\n${__dirname + "\\maps"}`);
    } catch(err) {
        evt.sender.send("reply", `${err}`);
    }
}

module.exports = { getData };