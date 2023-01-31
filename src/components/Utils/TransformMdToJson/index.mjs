import { marked } from "marked"
import fs from "fs"
import jsdom from "jsdom"
const { JSDOM } = jsdom;

const transformFiles = (jsonFilesList) => {
    const standings = new Map(Object.entries(jsonFilesList))
    standings.forEach((values) => {
        const newStandings = htmlToJson(values.new)
        const oldStandings = htmlToJson(values.old)
        for (let i = 1; i < newStandings.length; i++) {
            for (let j = 1; j < oldStandings.length; j++) {
                if (newStandings[i]['team'] === oldStandings[j]['team']) {
                    newStandings[i]['ranksdiff'] = oldStandings[j]['standing'] - newStandings[i]['standing']
                    newStandings[i]['pointsdiff'] = newStandings[i]['points'] - oldStandings[j]['points']
                } else {
                    continue
                }
            }
        }
        for (let x = 1; x < newStandings.length; x++) {
            if (newStandings[x]['ranksdiff'] === undefined) {
                newStandings[x]['ranksdiff'] = 0
                newStandings[x]['pointsdiff'] = 0
            }

            newStandings[x]['roster'] = newStandings[x]['roster'].split(', ')
        }
        var jsonContent = JSON.stringify(newStandings);
        fs.writeFile(`../Data/${values.region}.json`, jsonContent, 'utf8', function(err) {
            if (err) {
                return console.log(err);
            }
            console.log(`JSON file ${values.region} has been saved.`);
        });
    })
}

const htmlToJson = (standing) => {
    const data = fs.readFileSync(standing, 'utf-8', function(err, data) {
        if (err) throw err;
        return data
    });
    const result = [];

    const html = marked.parse(data)
    const dom = new JSDOM(html);
    const table = dom.window.document.querySelector("table");

    const title = dom.window.document.querySelector('h3');
    var jsonContent = {title : `${title.textContent}`};

    result.push(jsonContent)

    const headers = Array.from(table.querySelectorAll('thead tr th')).map(el => {
        const lastIndexOfSpace = el.textContent.lastIndexOf(' ');
        if (lastIndexOfSpace === -1) {
            return el.textContent.trim().toLowerCase()
        }

        return el.textContent.slice(0, lastIndexOfSpace).trim().toLowerCase()
    });


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

export default transformFiles
