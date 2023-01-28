const fs = require('fs');
const matter = require('gray-matter');
const str = fs.readFileSync('example.html', 'utf8');
console.log(matter(str));
