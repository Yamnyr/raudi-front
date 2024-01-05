// main.js

import { getAllModels } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const modelListElement = document.getElementById('modelList');

    // Appelle la fonction pour récupérer tous les modèles depuis l'API
    getAllModels()
        .then(models => {
            models.forEach(model => {
                const li = document.createElement('li');
                li.textContent = model.nom; // Supposons que le modèle a une propriété "name"
                modelListElement.appendChild(li);
            });
        });
});
