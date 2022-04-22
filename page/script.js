const ipc = require("electron").ipcRenderer;

async function convert() {
    let artist = document.getElementById("songArtist").value;
    let fileName = document.getElementById("fileName").value;
    let mapper = document.getElementById("mapper").value;
    let mapName = document.getElementById("map").value;
    let diffName = document.getElementById("diff").value;
    let raw = document.getElementById("raw").value;

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
        _approachDistance: 50,
        _approachTime: 1,
        _name: diffName,
        _notes: []
    }

    ipc.once("reply", (evt, res) => {
        alert(res);
    });

    ipc.send("convert", [metaJson, mapJson, raw]);
}