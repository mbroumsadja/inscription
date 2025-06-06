const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);
const fs = require('fs').promises;
const path = require('path');

async function deploy() {
  try {
    const dist_path = path.join(process.cwd(), 'dist');
    
    // Vérifier si dist/ existe
    try {
      const stat = await fs.stat(dist_path);
      if (!stat.isDirectory()) {
        console.error('Erreur : dist/ n\'est pas un dossier.');
        process.exit(1);
      }
    } catch (error) {
      console.log('Le dossier dist/ n\'existe pas encore, il sera créé lors du build.');
    }

    // Vérifier s'il y a des changements non committés
    try {
      const { stdout: status } = await execAsync('git status --porcelain');
      if (status.trim()) {
        console.log('Changements détectés. Ajout et commit automatique...');
        await execAsync('git add .');
        
        // Demander un message de commit ou utiliser un message par défaut
        const commitMessage = process.argv[2] || `Mise à jour du ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}`;
        await execAsync(`git commit -m "${commitMessage}"`);
        
        console.log('Changements committés avec succès.');
      } else {
        console.log('Aucun changement détecté dans le code source.');
      }
    } catch (error) {
      console.log('Erreur lors de la vérification du statut git:', error.message);
    }

    // Pousser les changements vers le dépôt principal
    try {
      console.log('Push des changements vers le dépôt principal...');
      await execAsync('git push origin main');
      console.log('Changements poussés vers le dépôt principal.');
    } catch (error) {
      // Essayer avec 'master' si 'main' échoue
      try {
        await execAsync('git push origin master');
        console.log('Changements poussés vers le dépôt principal (branche master).');
      } catch (masterError) {
        console.log('Avertissement : Impossible de pousser vers le dépôt principal.');
        console.log('Erreur:', error.message);
      }
    }

    // Reconstruire dist/
    console.log('Exécution de npm run build...');
    await execAsync('npm run build');
    console.log('Build terminé avec succès.');

    // Récupérer l'URL du dépôt
    const { stdout: remoteUrl } = await execAsync('git config --get remote.origin.url');
    let match = remoteUrl.trim().match(/github\.com[:\/](.+?)\/(.+?)(.git)?$/);
    let siteUrl = '';
    if (match) {
      const user = match[1];
      const repo = match[2].replace(/.git$/, '');
      siteUrl = `https://${user}.github.io/${repo}/`;
    }

    // Déployer avec gh-pages
    console.log('Déploiement vers gh-pages...');
    await execAsync('npx gh-pages -d dist');

    console.log('✅ Déploiement terminé avec succès !');
    if (siteUrl) {
      console.log(`🌐 Lien vers votre site : ${siteUrl}`);
      console.log('⏰ Votre site sera mis à jour dans quelques minutes...');
    }
    
  } catch (err) {
    console.error('❌ Erreur lors du déploiement :', err.message);
    process.exit(1);
  }
}

deploy();