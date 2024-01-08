// addOption.js

import { getAllOptions, addOption } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const addOptionForm = document.getElementById('addOptionForm');
    const optionsListElement = document.getElementById('optionsList');

    // Appelle la fonction pour récupérer toutes les options depuis l'API
    const options = await getAllOptions();

    // Affiche la liste des options
    options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.textContent = `Option: ${option.nom}, Prix: ${option.prix}`;
        optionsListElement.appendChild(optionElement);
    });

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

        // Réaffiche la liste des options après l'ajout
        optionsListElement.innerHTML = ''; // Efface la liste actuelle
        const updatedOptions = await getAllOptions();
        updatedOptions.forEach(updatedOption => {
            const optionElement = document.createElement('div');
            optionElement.textContent = `Option: ${updatedOption.nom}, Prix: ${updatedOption.prix}`;
            optionsListElement.appendChild(optionElement);
        });
    });
});
