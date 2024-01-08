// configure.js
import { getCookie } from './token.js';
const token = getCookie('Authorization');

import { getOneModelById, getOptionsByModelId, createCommand } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const modelDetailsElement = document.getElementById('modelDetails');
    const optionsListElement = document.getElementById('optionsList');
    const configureForm = document.getElementById('configureForm');
    const montantTotalInput = document.getElementById('montantTotal');

    // Récupère l'ID du modèle à partir de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const modelId = urlParams.get('modele');

    let montantTotal = 0;
    let listeOptions = [];

    // Appelle la fonction pour récupérer les détails du modèle spécifié depuis l'API
    // getOneModelById(modelId)
    //     .then(model => {
    //         const detailsHTML = `
    //             <p>Nom: ${model.nom}</p>
    //             <p>Prix: ${model.prix}</p>
    //             <p>Nb de portes: ${model.nbr_porte}</p>
    //             <p>Moteur: ${model.moteur}</p>
    //             <p>Taille: ${model.taille}</p>
    //         `;
    //         modelDetailsElement.innerHTML = detailsHTML;
    //
    //         // Ajoute le prix du modèle au montant total
    //         montantTotal += model.prix;
    //         updateMontantTotalInput();
    //     });
    //
    // // Appelle la fonction pour récupérer les options du modèle
    // getOptionsByModelId(modelId)
    //     .then(options => {
    //         options.forEach(option => {
    //             const checkbox = document.createElement('input');
    //             checkbox.type = 'checkbox';
    //             checkbox.id = `option_${option.id}`;
    //             checkbox.name = 'options';
    //             checkbox.value = option.id;
    //
    //             const label = document.createElement('label');
    //             label.htmlFor = `option_${option.id}`;
    //             label.textContent = `Option: ${option.nom}, Prix: ${option.prix}`;
    //
    //             checkbox.addEventListener('change', () => {
    //                 // Met à jour le montant total en fonction des options cochées/décochées
    //                 if (checkbox.checked) {
    //                     montantTotal += option.prix;
    //                     listeOptions.push(option.id);
    //                 } else {
    //                     montantTotal -= option.prix;
    //                     listeOptions = listeOptions.filter(optId => optId !== option.id);
    //                 }
    //                 updateMontantTotalInput();
    //             });
    //
    //             optionsListElement.appendChild(checkbox);
    //             optionsListElement.appendChild(label);
    //             optionsListElement.appendChild(document.createElement('br'));
    //         });
    //     });
    //
    configureForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Récupère l'ID de l'utilisateur (à remplacer par la vraie logique)
        const userId = '02f785fb-bc01-41c1-975f-b828da5e4f05';

        // Appelle la fonction pour créer une commande via l'API
        createCommand({
            montant_total: montantTotal,
            liste_options: listeOptions,
            id_utilisateur: userId,
            id_modele: modelId,
        });
    });
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
        montantTotal += model.prix;
        updateMontantTotalInput();
        detailsContainer.innerHTML += detailsHTML;

        // Ajoute la div detailsContainer à modelDetailsElement
        modelDetailsElement.appendChild(detailsContainer);

        // // Appelle la fonction pour récupérer les options du modèle
        getOptionsByModelId(modelId)
            .then(options => {
                options.forEach(option => {
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.id = `option_${option.id}`;
                    checkbox.name = 'options';
                    checkbox.value = option.id;

                    const label = document.createElement('label');
                    label.htmlFor = `option_${option.id}`;
                    label.textContent = `Option: ${option.nom}, Prix: ${option.prix}`;

                    checkbox.addEventListener('change', () => {
                        // Met à jour le montant total en fonction des options cochées/décochées
                        if (checkbox.checked) {
                            montantTotal += option.prix;
                            listeOptions.push(option.id);
                        } else {
                            montantTotal -= option.prix;
                            listeOptions = listeOptions.filter(optId => optId !== option.id);
                        }
                        updateMontantTotalInput();
                    });

                    optionsListElement.appendChild(checkbox);
                    optionsListElement.appendChild(label);
                    optionsListElement.appendChild(document.createElement('br'));
                });
            });
    });

    // configureForm.addEventListener('submit', (event) => {
    //     event.preventDefault();
    //
    //     // Récupère l'ID de l'utilisateur (à remplacer par la vraie logique)
    //     const userId = '02f785fb-bc01-41c1-975f-b828da5e4f05';
    //
    //     // Appelle la fonction pour créer une commande via l'API
    //     createCommand({
    //         montant_total: montantTotal,
    //         liste_options: listeOptions,
    //         id_utilisateur: userId,
    //         id_modele: modelId,
    //     });
    // });
    function updateMontantTotalInput() {
        montantTotalInput.value = montantTotal;
    }
});
