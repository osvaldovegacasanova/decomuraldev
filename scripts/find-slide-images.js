import XLSX from 'xlsx';

const wb = XLSX.readFile('../data.xlsx');
const sku = XLSX.utils.sheet_to_json(wb.Sheets['sku']);

const slide1Sample = sku.find(s => s.filename === '369223.webp');
const slide1Ambient = sku.find(s => s.filename === '369223_3-768x512.webp');
const slide2Sample = sku.find(s => s.filename === '300434.webp');
const slide2Ambient = sku.find(s => s.filename === '300434_4-768x1024.webp');

console.log('Slide 1 (Stories of Life):');
console.log('  Sample image folder:', slide1Sample?.folder || 'Not found');
console.log('  Ambient image folder:', slide1Ambient?.folder || 'Not found');
console.log('  Collection:', slide1Sample?.coleccion);

console.log('\nSlide 2 (Elements II):');
console.log('  Sample image folder:', slide2Sample?.folder || 'Not found');
console.log('  Ambient image folder:', slide2Ambient?.folder || 'Not found');
console.log('  Collection:', slide2Sample?.coleccion);
