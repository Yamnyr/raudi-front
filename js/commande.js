// commande.js
import { getCookie } from './token.js';
const token = getCookie('Authorization');
import { getAllCommands } from './api.js';



document.addEventListener('DOMContentLoaded', () => {
    const commandListElement = document.getElementById('commandList');
    const monthTotalTable = {};
    let totalMontantTotal = 0;

    // Appelle la fonction pour récupérer toutes les commandes depuis l'API
    getAllCommands()
        .then(async commands => {
            for (const command of commands) {
                const li = document.createElement('li');
                const formattedDate = formatDate(new Date(command.createdAt));
                const monthKey = formattedDate.split(' ')[1]; // Récupère le nom du mois
                const yearKey = formattedDate.split(' ')[2]; // Récupère l'année

                // Fetch user details based on id_utilisateur
                const userResponse = await fetch(`http://localhost:8000/utilisateur/getone/${command.id_utilisateur}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': token,
                    },
                });

                const userData = await userResponse.json();

                li.textContent = `Commande ID: ${command.id}, Date: ${formattedDate}, Montant: ${command.montant_total} €, Utilisateur: ${userData.nom} ${userData.prenom}`;

                totalMontantTotal += command.montant_total;

                const monthYearKey = `${monthKey} ${yearKey}`;
                if (monthTotalTable[monthYearKey]) {
                    monthTotalTable[monthYearKey] += command.montant_total;
                } else {
                    monthTotalTable[monthYearKey] = command.montant_total;
                }

                commandListElement.appendChild(li);
            }

            // const totalLi = document.createElement('li');
            // totalLi.textContent = `Montant Total: ${totalMontantTotal} €`;
            // commandListElement.appendChild(totalLi);
            displayMonthTotalTable(monthTotalTable);
        });
});

function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
}

function displayMonthTotalTable(monthTotalTable) {
    const tableContainer = document.getElementById('monthTotalTable');

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headerRow = document.createElement('tr');
    const monthHeader = document.createElement('th');
    monthHeader.textContent = 'Mois';
    const totalHeader = document.createElement('th');
    totalHeader.textContent = 'Montant Total';
    headerRow.appendChild(monthHeader);
    headerRow.appendChild(totalHeader);
    thead.appendChild(headerRow);
    table.appendChild(thead);

    for (const monthYear in monthTotalTable) {
        const row = document.createElement('tr');
        const monthYearCell = document.createElement('td');
        monthYearCell.textContent = monthYear;
        const totalCell = document.createElement('td');
        totalCell.textContent = `${monthTotalTable[monthYear]} €`;
        row.appendChild(monthYearCell);
        row.appendChild(totalCell);
        tbody.appendChild(row);
    }

    // Ajoute une nouvelle ligne pour afficher le montant total global
    const totalRow = document.createElement('tr');
    const totalLabelCell = document.createElement('td');
    totalLabelCell.textContent = 'Montant Total Global';
    const totalAmountCell = document.createElement('td');
    totalAmountCell.textContent = `${calculateGlobalTotal(monthTotalTable)} €`;
    totalRow.appendChild(totalLabelCell);
    totalRow.appendChild(totalAmountCell);
    tbody.appendChild(totalRow);

    table.appendChild(tbody);
    tableContainer.appendChild(table);
}

// Ajoute une fonction pour calculer le montant total global
function calculateGlobalTotal(monthTotalTable) {
    let globalTotal = 0;
    for (const monthYear in monthTotalTable) {
        globalTotal += monthTotalTable[monthYear];
    }
    return globalTotal;
}
