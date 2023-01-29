import https from "https"
import path from "path"
import fs, { readFileSync } from "fs"
import dateFormat from "dateformat"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const regions = JSON.parse(readFileSync(path.resolve(__dirname, "../regions.json"), "utf-8"))
var objMap = new Map(Object.entries(regions));

const downloadFile = (url, standing_name) => {
    const filename = path.resolve(__dirname, `../standings/${standing_name}/${standing_name}-${dateFormat(Date(), "dd-mm-yy")}.md`)
    https.get(url, (res) => {
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            fs.appendFile(path.join(filename), chunk, function(err) {
                if (err) throw err;
            });
        });
    });
}

export const saveNewStandingsFiles = () => {
    objMap.forEach((url, standing_name) => {
        downloadFile(url, standing_name)
    });
}
