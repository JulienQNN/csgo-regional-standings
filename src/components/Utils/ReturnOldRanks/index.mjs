import path from "path"
import fs, { readFileSync } from "fs"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const regions = JSON.parse(readFileSync(path.resolve(__dirname, "../regions.json"), "utf-8"))
var objMap = new Map(Object.entries(regions));

const getMostRecentFile = (dir, standing_name) => {
    const files = orderRecentFiles(dir);
    if (files[0] && files[1]) {
        return {
            "region": standing_name,
            "new": path.resolve(__dirname, `../standings/${standing_name}/${files[0].file}`),
            "old": path.resolve(__dirname, `../standings/${standing_name}/${files[1].file}`)
        }
    }
}

const orderRecentFiles = (dir) => {
    return fs.readdirSync(dir)
        .filter((file) => fs.lstatSync(path.join(dir, file)).isFile())
        .map((file) => ({ file, mtime: fs.lstatSync(path.join(dir, file)).mtime }))
        .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
};

export const returnLastStandingsFiles = () => {
    const standingsToCompare = []
    objMap.forEach((url, standing_name) => {
        standingsToCompare.push(getMostRecentFile(path.resolve(__dirname, `../standings/${standing_name}/`), standing_name)
        )
    });
    return standingsToCompare
}

export default returnLastStandingsFiles
