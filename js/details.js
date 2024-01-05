import { getOneModelById } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const modelDetailsElement = document.getElementById('modelDetails');

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
        });
});