// commande.js

import { getCookie } from './token.js';
document.addEventListener('DOMContentLoaded', () => {
    const commandListElement = document.getElementById('commandList');

    // Appelle la fonction pour récupérer toutes les commandes depuis l'API
    getAllCommands()
        .then(commands => {
            commands.forEach(command => {
                const li = document.createElement('li');
                li.textContent = `Commande ID: ${command.id}, Date: ${command.date}, Montant: ${command.montant}`;
                commandListElement.appendChild(li);
            });
        });
});

function getAllCommands() {
    const token = getCookie('Authorization');
    console.log(token)
    return fetch('http://localhost:8000/commande/getall',{
        method: 'GET',
        headers: {
            'Authorization': token,
        },
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erreur lors de la requête');
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}
