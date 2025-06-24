const fs = require('fs');
const path = require('path');
const slugify = require('slugify');

const pdfDir = path.join(process.cwd(), 'public/pdf');

fs.readdir(pdfDir, (err, files) => {
  if (err) {
    console.error('Fehler beim Lesen des Verzeichnisses:', err);
    return;
  }

  files.forEach((file) => {
    const ext = path.extname(file);
    if (ext.toLowerCase() !== '.pdf') return;

    const base = path.basename(file, ext);

    const safeName = slugify(base, {
      lower: true,
      strict: true,
    });

    const newName = `${safeName}.pdf`;
    const oldPath = path.join(pdfDir, file);
    const newPath = path.join(pdfDir, newName);

    if (oldPath !== newPath) {
      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          console.error(`Fehler beim Umbenennen von ${file}:`, err);
        } else {
          console.log(`✅ ${file} → ${newName}`);
        }
      });
    }
  });
});
