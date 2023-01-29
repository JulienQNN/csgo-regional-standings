
import { marked } from "marked"
import fs from "fs"
import jsdom from "jsdom"
const { JSDOM } = jsdom;

export const transformFiles = (jsonFilesList) => {
    const standings = new Map(Object.entries(jsonFilesList))

    standings.forEach((values, keys) => {
        console.log(htmlToJson(values.new))
        const newStandings = htmlToJson(values.new)
        const oldStandings = htmlToJson(values.old)

    })
}

const htmlToJson = (standing) => {
    const data = fs.readFileSync(standing, 'utf-8', function(err, data) {
        if (err) throw err;
        return data
    });

    const html = marked.parse(data)
    const dom = new JSDOM(html);
    const title = dom.window.document.querySelector("h3").textContent;
    const table = dom.window.document.querySelector("table");
    const headers = Array.from(table.querySelectorAll('thead tr th')).map(el => el.textContent.trim());
    const result = [title];
    const rows = Array.from(table.querySelectorAll('tbody tr'));

    rows.forEach(row => {
        const cells = Array.from(row.querySelectorAll('td')).map(el => el.textContent.trim());
        result.push(headers.reduce((rowRes, header, headerIndex) => {
            return {
                ...rowRes,
                [header]: cells[headerIndex]
            };
        }, {}));
    });
    return result
}
