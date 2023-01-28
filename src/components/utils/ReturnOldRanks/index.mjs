import path from "path"
import fs from "fs"

const getMostRecentFile = (dir) => {
    const files = orderRecentFiles(dir);
    return files.length ? files[0] : undefined;
};

const orderRecentFiles = (dir) => {
    return fs.readdirSync(dir)
        .filter((file) => fs.lstatSync(path.join(dir, file)).isFile())
        .map((file) => ({ file, mtime: fs.lstatSync(path.join(dir, file)).mtime }))
        .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
};

console.log(getMostRecentFile('../standings/standings_europe/'));
