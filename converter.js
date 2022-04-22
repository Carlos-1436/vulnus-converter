const axios = require("axios");
const fs = require("fs");

function convert(infos, evt) {
    let metaJson = infos[0];
    let mapJson = infos[1];

    axios.get(infos[2])
    .then(res => {
        if (res.status == 200) {
            let format = res.data.split(",");
            format.shift() // Remover o ID da música do roblox

            // Converter cada uma das notas para o vulkan e por no array _notes
            for (let i = 0; i < format.length; i++) {
                let formatedNote = format[i].split("|");
                let x = parseInt(formatedNote[0]) - 1;
                let y = parseInt(formatedNote[1]) - 1;
                let ms = parseInt(formatedNote[2]) / 1000;
                mapJson["_notes"].push({ _time: ms, _x: x, _y: y });
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
        } else {
            evt.sender.send("reply", `Server returned status ${res.status}`);
        }
    })
    .catch(error => {
        evt.sender.send("reply", error);
    });
}

module.exports = { convert };