const fs = require('fs').promises;
const path = require('path');
const ora = require('ora');

async function build() {
  const spinner = ora('Construction du projet pour la production...').start();
  const distPath = path.join(process.cwd(), 'dist');

  try {
    // Supprimer le dossier dist s'il existe
    await fs.rm(distPath, { recursive: true, force: true });
    await fs.mkdir(distPath, { recursive: true });

    // Copier les fichiers principaux
    await fs.copyFile(
      path.join(process.cwd(), 'index.html'),
      path.join(distPath, 'index.html')
    );

    await fs.copyFile(
      path.join(process.cwd(), 'README.md'),
      path.join(distPath, 'README.md')
    );
 const exist = await fs
      .access(path.join(process.cwd(), "favicon.ico"))
      .then(() => true)
      .catch(() => false);
    if (exist) {
      await fs.copyFile(
        path.join(process.cwd(), "favicon.ico"),
        path.join(distPath, "favicon.ico")
      );
    }

    const exists = await fs
      .access(path.join(process.cwd(), 'public'))
      .then(() => true)
      .catch(() => false);
    if (exists) {
      // Copier le dossier public (css, js, assets, pages, trello)
      await fs.cp(
        path.join(process.cwd(), 'public'),
        path.join(distPath, 'public'),
        { recursive: true }
      );
    }
      
    spinner.succeed('Projet construit avec succès dans dist/.');
  } catch (error) {
    spinner.fail(`Échec de la construction : ${error.message}`);
    throw error;
  }
}

build();