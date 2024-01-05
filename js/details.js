// details.js

import { getOneModelById, getOptionsByModelId } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const modelDetailsElement = document.getElementById('modelDetails');
    const optionsListElement = document.getElementById('optionsList');

    // Récupère l'ID du modèle à partir de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const modelId = urlParams.get('modele');

    // Appelle la fonction pour récupérer les détails du modèle spécifié depuis l'API
    getOneModelById(modelId)
        .then(model => {
            const detailsHTML = `
                <p>Nom: ${model.nom}</p>
                <p>Prix: ${model.prix}</p>
                <p>Nb de portes: ${model.nbr_porte}</p>
                <p>Moteur: ${model.moteur}</p>
                <p>Taille: ${model.taille}</p>
            `;
            modelDetailsElement.innerHTML = detailsHTML;

            // Appelle la fonction pour récupérer les options du modèle
            getOptionsByModelId(modelId)
                .then(options => {
                    // Affiche les options sur la page
                    options.forEach(option => {
                        const li = document.createElement('li');
                        li.textContent = `Option: ${option.nom}, Prix: ${option.prix}`;
                        optionsListElement.appendChild(li);
                    });
                });
        });
});
