const fs = require('fs');
const path = require('path');

const rioSamanaDir = path.join(__dirname, '../src/pages/rio-samana');
const files = fs.readdirSync(rioSamanaDir).filter(file => file.endsWith('.astro'));

files.forEach(file => {
  const filePath = path.join(rioSamanaDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Reemplazar la ruta de importación
  const newContent = content.replace(
    /import Layout from '\\.\\.\\/\\.\\.\\/layouts\\/Layout\\.astro'/, 
    "import Layout from '../../layouts/Layout.astro'"
  );
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent);
    console.log(`✅ Corregida la ruta de importación en ${file}`);
  } else {
    console.log(`✅ ${file} ya tiene la ruta correcta`);
  }
});

console.log('✅ Todas las rutas han sido verificadas');
