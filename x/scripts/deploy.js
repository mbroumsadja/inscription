const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);
const fs = require('fs').promises;
const path = require('path');

async function deploy() {
  const dist_path = path.join(process.cwd(), 'dist');

  // Vérifier si le dossier dist existe
  try {
    const stat = await fs.stat(dist_path);
    if (!stat.isDirectory()) {
      console.error('Le chemin dist/ existe mais ce nest pas un dossier.');
      process.exit(1);
    }
  } catch (err) {
    console.error('Le dossier dist/ n existe pas. Veuillez le générer avant de déployer.',err);
    process.exit(1);
  }

  // Récupérer l'URL du dépôt distant
  const { stdout: remoteUrl } = await execAsync('git config --get remote.origin.url');

  let match = remoteUrl.trim().match(github.com[:\/](.+?)\/(.+?)(.git)?$/);
  let siteUrl = '';
  if (match) {
    const user = match[1];
    const repo = match[2].replace(/.git$/, '');
    siteUrl = `https://${user}.github.io/${repo}/`;
  }
  // Déployer avec gh-pages
  await execAsync('gh-pages -d dist');

  console.log('Déploiement terminé !');
  if (siteUrl) console.log(`lien vers votre site web : ${siteUrl}`);
}
deploy();