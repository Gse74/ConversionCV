# ConversionCV

## Objectif
ConversionCV est une page web permettant de transformer un CV personnel en un format normalisé.

## Fonctionnement
L'utilisateur télécharge son CV au format PDF ou Word. Le fichier est envoyé au webhook `https://hook.eu2.make.com/` pour être traité. La page attend ensuite la réponse du serveur afin d'afficher le PDF généré et de le proposer au téléchargement.

## Dépendances
- [Tailwind CSS](https://cdn.tailwindcss.com) pour la mise en forme.
- [Font Awesome](https://cdnjs.cloudflare.com/ajax/libs/font-awesome) pour les icônes.
Ces dépendances sont chargées via leur CDN et ne nécessitent pas d'installation locale.

## Utilisation de Tailwind CSS en production
Le CDN `tailwindcss.com` est pratique pour le développement et le prototypage, mais il ne doit pas être utilisé en production. Pour obtenir une feuille de style optimisée, générez votre CSS via PostCSS ou le CLI :

```bash
npm install -D tailwindcss
npx tailwindcss -i ./src/input.css -o ./dist/output.css --minify
```

Consultez [la documentation officielle](https://tailwindcss.com/docs/installation) pour plus de détails.

## Procédure d'utilisation
1. Ouvrez le fichier `CV Conversion Tool.html` dans votre navigateur.
2. Glissez-déposez votre CV ou sélectionnez-le via le bouton proposé.
3. Cliquez sur « Process » pour lancer la conversion simulée.
4. Une fois le traitement terminé, un aperçu s'affiche et vous pouvez télécharger la version standardisée.

## Exécution ou déploiement
Pour exécuter la page en local, ouvrez simplement le fichier HTML dans un navigateur moderne. Pour un déploiement en ligne, lancez `./configure.sh <votre_url>` afin de renseigner l'adresse du webhook puis placez le fichier sur n'importe quel serveur web statique (par exemple GitHub Pages) car aucun backend n'est requis.

## Licence
Ce projet est distribué sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.
