import XLSX from 'xlsx';

const wb = XLSX.readFile('../data.xlsx');
const skuSheet = wb.Sheets['sku'];
const skuData = XLSX.utils.sheet_to_json(skuSheet);
console.log('SKU columns:', Object.keys(skuData[0] || {}));

const collSheet = wb.Sheets['coleccion'];
const collData = XLSX.utils.sheet_to_json(collSheet);
console.log('Collection columns:', Object.keys(collData[0] || {}));
