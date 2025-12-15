import XLSX from 'xlsx';

const wb = XLSX.readFile('../data.xlsx');
const sheet = wb.Sheets['sku'];
const data = XLSX.utils.sheet_to_json(sheet);
const lineas = [...new Set(data.map(r => r.linea))];
console.log('Unique SKU Lineas:', lineas);
