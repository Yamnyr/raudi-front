// details.js

import { getModelImageById, getOneModelById, getOptionsByModelId } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const modelDetailsElement = document.getElementById('modelDetails');

    // Récupère l'ID du modèle à partir de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const modelId = urlParams.get('modele');

    // Appelle la fonction pour récupérer les détails du modèle spécifié depuis l'API
    getOneModelById(modelId).then(async (model) => {
        // Crée la div pour contenir les détails et les options
        const detailsContainer = document.createElement('div');
        detailsContainer.classList.add('details-container');

        // Crée l'élément img avec les propriétés src et alt
        const img = document.createElement('img');
        img.src = model.img; // L'URL de l'image
        img.alt = model.nom; // Alt de l'image (nom du modèle)

        // Ajoute l'image du modèle à la div detailsContainer
        detailsContainer.appendChild(img);

        const detailsHTML = `
            <div style="width: 20%" class="model-info">
                <h2>${model.nom}</h2>
                <p>Prix: ${model.prix}</p>
                <p>Nb de portes: ${model.nbr_porte}</p>
                <p>Moteur: ${model.moteur}</p>
                <p>Taille: ${model.taille}</p>
            </div>
        `;
        // Ajoute les détails après l'image dans la div detailsContainer
        detailsContainer.innerHTML += detailsHTML;

        // Ajoute la div detailsContainer à modelDetailsElement
        modelDetailsElement.appendChild(detailsContainer);

        // Appelle la fonction pour récupérer les options du modèle
        getOptionsByModelId(modelId).then((options) => {
            // Crée la div pour contenir les options
            const optionsContainer = document.createElement('div');
            optionsContainer.classList.add('options-container');

            // Ajoute un h2 au-dessus de la liste des options
            const optionsHeading = document.createElement('h2');
            optionsHeading.textContent = 'Liste des options';
            optionsContainer.appendChild(optionsHeading);

            // Affiche les options dans des cases
            options.forEach((option) => {
                const optionBox = document.createElement('div');
                optionBox.classList.add('option-box');
                optionBox.textContent = `${option.nom}, Prix: ${option.prix}`;
                optionsContainer.appendChild(optionBox);
            });

            // Ajoute la div optionsContainer sous la div detailsContainer
            detailsContainer.appendChild(optionsContainer);

            // Ajoute un bouton "Configurer"
            const configureButton = document.createElement('button');
            configureButton.textContent = 'Configurer';

            // Ajoute un gestionnaire d'événements pour rediriger vers la page de configuration
            configureButton.addEventListener('click', () => {
                window.location.href = `configure.html?modele=${model.id}`;
            });

            // Ajoute le bouton "Configurer" à modelDetailsElement
            modelDetailsElement.appendChild(configureButton);
        });
    });
});
