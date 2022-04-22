const ipc = require("electron").ipcRenderer;

async function convert() {
    let artist = document.getElementById("songArtist").value.trim();
    let fileName = document.getElementById("fileName").value.trim();
    let mapper = document.getElementById("mapper").value.trim();
    let mapName = document.getElementById("map").value.trim();
    let diffName = document.getElementById("diff").value.trim();
    let raw = document.getElementById("raw").value.trim();
    let offset = document.getElementById("offset").value;
    let apprTime = document.getElementById("apprTime").value;
    let apprDist = document.getElementById("apprDist").value;

    if (isNaN(parseFloat(offset))) {
        offset = 0;
    }

    if (isNaN(parseInt(apprTime))) {
        apprTime = 1;
    }

    if (isNaN(parseInt(apprDist))) {
        apprDist = 50;
    }

    // Get all data
    let metaJson = {
        _artist: artist,
        _difficulties: ["converted.json"],
        _mappers: [mapper],
        _music: fileName,
        _title: mapName,
        _version: 1
    }

    let mapJson = {
        _approachDistance: apprDist,
        _approachTime: apprTime,
        _name: diffName,
        _notes: []
    }

    ipc.once("reply", (evt, res) => {
        alert(res);
    });

    ipc.send("convert", [metaJson, mapJson, raw, offset]);
}