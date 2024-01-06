// main.js

import { getAllModels, getModelImageById } from './api.js';
console.log("test")
document.addEventListener('DOMContentLoaded', () => {
    const modelListElement = document.getElementById('modelList');

    // Appelle la fonction pour récupérer tous les modèles depuis l'API
    getAllModels()
        .then(async models => {
            for (const modele of models) {
                const li = document.createElement('li');

                // Appelle la fonction pour récupérer l'URL de l'image
                const imgSrc = await getModelImageById(modele.id);

                // Ajoute l'image du modèle
                const img = document.createElement('img');
                img.src = imgSrc; // L'URL de l'image
                img.alt = modele.nom; // Alt de l'image (nom du modèle)

                // Ajoute le nom et le prix du modèle
                const modelInfo = document.createElement('div');
                modelInfo.textContent = `${modele.nom} Prix: ${modele.prix} €`;

                // Ajoute un bouton "Voir plus"
                const viewButton = document.createElement('button');
                viewButton.textContent = 'Voir plus';

                // Ajoute un gestionnaire d'événements pour rediriger vers la page de détails
                viewButton.addEventListener('click', () => {
                    window.location.href = `details.html?modele=${modele.id}`;
                });

                // Ajoute un bouton "Configurer"
                const configureButton = document.createElement('button');
                configureButton.textContent = 'Configurer';

                // Ajoute un gestionnaire d'événements pour rediriger vers la page de configuration
                configureButton.addEventListener('click', () => {
                    window.location.href = `configure.html?modele=${modele.id}`;
                });

                // Ajoute les éléments à l'élément <li>
                li.appendChild(img);
                li.appendChild(modelInfo);
                li.appendChild(viewButton);
                li.appendChild(configureButton);

                // Ajoute l'élément <li> à la liste
                modelListElement.appendChild(li);
            }
        });
});
