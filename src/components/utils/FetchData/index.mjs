import https from "https"
import path, { dirname } from "path"
import fs, { readFileSync, writeFileSync } from "fs"
import dateFormat from "dateformat"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename) + "/standings";
const regions = JSON.parse(readFileSync("./regions.json", "utf-8"))

var objMap = new Map(Object.entries(regions));

objMap.forEach((url, standing_name) => {
    downloadFile(url, standing_name)
});

function downloadFile(url, standing_name) {
    const file = path.basename(url)
    const filename = `${__dirname}/${standing_name}/${dateFormat(Date(), "dd-mm-yy")}.md`
    const filePath = path.resolve(`./standings/${standing_name}/${dateFormat(Date(), "dd-mm-yy")}.md`);
    console.log(filePath)
    console.log(file)
    https.get(url, (res) => {
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            fs.appendFile(path.join(filename), chunk, function(err) {
                if (err) throw err;
            });
        });
    });
}

