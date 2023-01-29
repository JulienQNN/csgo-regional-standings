import path from "path"
import fs, { readFileSync } from "fs"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const regions = JSON.parse(readFileSync(path.resolve(__dirname, "../regions.json"), "utf-8"))
var objMap = new Map(Object.entries(regions));

const getMostRecentFile = (dir) => {
    const files = orderRecentFiles(dir);
    console.log([files[0].file, files[1].file])
    return files.length ? [files[0].file, files[1].file] : undefined;
};

const orderRecentFiles = (dir) => {
    return fs.readdirSync(dir)
        .filter((file) => fs.lstatSync(path.join(dir, file)).isFile())
        .map((file) => ({ file, mtime: fs.lstatSync(path.join(dir, file)).mtime }))
        .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
};

export const returnLastStandingsFiles = () => {
    objMap.forEach((url, standing_name) => {
        getMostRecentFile(path.resolve(__dirname, `../standings/${standing_name}/`), "utf-8")
    });
}

returnLastStandingsFiles()
