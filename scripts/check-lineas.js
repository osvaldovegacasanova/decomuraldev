import XLSX from 'xlsx';

const wb = XLSX.readFile('../data.xlsx');
const sheet = wb.Sheets['coleccion'];
const data = XLSX.utils.sheet_to_json(sheet);
const lineas = [...new Set(data.map(r => r.Linea))];
console.log('Unique Lineas:', lineas);
