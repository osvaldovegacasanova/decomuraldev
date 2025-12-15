import XLSX from 'xlsx';

const wb = XLSX.readFile('../data.xlsx');
const sheet = wb.Sheets['CollectionShowcase'];
const data = XLSX.utils.sheet_to_json(sheet);

console.log('CollectionShowcase data:');
console.log(JSON.stringify(data, null, 2));

// Group by linea
const grouped = data.reduce((acc, item) => {
  const linea = item.linea || 'unknown';
  if (!acc[linea]) acc[linea] = [];
  acc[linea].push(item);
  return acc;
}, {});

console.log('\n\nGrouped by linea:');
console.log(JSON.stringify(grouped, null, 2));
