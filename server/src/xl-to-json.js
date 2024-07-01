const 
    xlsx = require("xlsx"),
    fs = require("fs"),
    xlFilePath = "GiT_Repos - Final.xlsm";

function convertFile() {
    const workbook = xlsx.readFile(xlFilePath);   
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const json = xlsx.utils.sheet_to_json(worksheet);

    return json;
}

const json = convertFile();
fs.writeFileSync("git-repos.json", JSON.stringify(json, null,2 ));