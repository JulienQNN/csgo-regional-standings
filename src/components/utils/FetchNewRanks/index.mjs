import https from "https"
import path from "path"
import fs, { readFileSync} from "fs"
import dateFormat from "dateformat"

const regions = JSON.parse(readFileSync("./regions.json", "utf-8"))
var objMap = new Map(Object.entries(regions));

objMap.forEach((url, standing_name) => {
    downloadFile(url, standing_name)
});

function downloadFile(url, standing_name) {
    const filename = `../standings/${standing_name}/${dateFormat(Date(), "dd-mm-yy")}.md`
    https.get(url, (res) => {
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            fs.appendFile(path.join(filename), chunk, function(err) {
                if (err) throw err;
            });
        });
    });
}

