// main.js

import { getAllModels } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const modelListElement = document.getElementById('modelList');

    // Appelle la fonction pour récupérer tous les modèles depuis l'API
    getAllModels()
        .then(models => {
            models.forEach(modele => {
                const li = document.createElement('li');
                li.textContent = `Nom: ${modele.nom}, Prix: ${modele.prix}, Nb de portes: ${modele.nbr_porte}, Moteur: ${modele.moteur}, Taille: ${modele.taille}`;

                // Ajoute un bouton
                const button = document.createElement('button');
                button.textContent = 'Voir plus';

                // Ajoute un gestionnaire d'événements pour rediriger vers une autre page
                button.addEventListener('click', () => {
                    window.location.href = `details.html?modele=${modele.id}`;
                });

                li.appendChild(button);
                modelListElement.appendChild(li);
            });
        });
});
