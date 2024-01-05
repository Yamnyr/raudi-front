// commande.js
import { getCookie } from './token.js';
const token = getCookie('Authorization');
import { getAllCommands } from './api.js';
document.addEventListener('DOMContentLoaded', () => {
    const commandListElement = document.getElementById('commandList');
    let totalMontantTotal = 0;

    // Appelle la fonction pour récupérer toutes les commandes depuis l'API
    getAllCommands()
        .then(async commands => {
            for (const command of commands) {
                const li = document.createElement('li');
                const formattedDate = new Date(command.createdAt).toLocaleDateString('fr-FR');

                // Fetch user details based on id_utilisateur
                const userResponse = await fetch(`http://localhost:8000/utilisateur/getone/${command.id_utilisateur}`,{
                    method: 'GET',
                    headers: {
                        'Authorization': token,
                    },
                })
                const userData = await userResponse.json();

                li.textContent = `Commande ID: ${command.id}, Date: ${formattedDate}, Montant: ${command.montant_total} €, Utilisateur: ${userData.nom} ${userData.prenom}`;

                totalMontantTotal += command.montant_total;

                commandListElement.appendChild(li);
            }

            // Display the total at the end
            const totalLi = document.createElement('li');
            totalLi.textContent = `Montant Total du Mois actuel: ${totalMontantTotal} €`;
            commandListElement.appendChild(totalLi);
        });
});
