// addModel.js

import { getAllOptions, addModel } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const optionsList = document.getElementById('optionsList');
    const addModelForm = document.getElementById('addModelForm');

    // Appelle la fonction pour récupérer toutes les options depuis l'API
    const options = await getAllOptions();

    // Ajoute les options à la liste de cases à cocher
    options.forEach(option => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `option_${option.id}`;
        checkbox.name = 'liste_options';
        checkbox.value = option.id;

        const label = document.createElement('label');
        label.htmlFor = `option_${option.id}`;
        label.textContent = option.nom;

        optionsList.appendChild(checkbox);
        optionsList.appendChild(label);
        optionsList.appendChild(document.createElement('br'));
    });

    addModelForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Récupère les valeurs du formulaire
        const formData = new FormData(addModelForm);

        // Convertit les valeurs du formulaire en objet JSON
        const modelData = {};
        formData.forEach((value, key) => {
            if (key === 'liste_options') {
                modelData[key] = Array.from(formData.getAll(key));
            } else {
                modelData[key] = value;
            }
        });

        // Appelle la fonction pour ajouter un modèle via l'API
        await addModel(modelData);
    });
});
