// addOption.js

import { addOption } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const addOptionForm = document.getElementById('addOptionForm');

    addOptionForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Récupère les valeurs du formulaire
        const formData = new FormData(addOptionForm);

        // Convertit les valeurs du formulaire en objet JSON
        const optionData = {};
        formData.forEach((value, key) => {
            optionData[key] = value;
        });

        // Appelle la fonction pour ajouter une option via l'API
        await addOption(optionData);
    });
});