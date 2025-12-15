import XLSX from 'xlsx';

const wb = XLSX.readFile('../data.xlsx');
const sheet = wb.Sheets['IndexheroSlides'];
const data = XLSX.utils.sheet_to_json(sheet);

console.log('IndexheroSlides data:');
console.log(JSON.stringify(data, null, 2));
