// api.js
import { getCookie } from './token.js';
const token = getCookie('Authorization');
function getAllModels() {
    return fetch('http://localhost:8000/modele/getall')
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

function getOneModelById(modelId) {
    const url = `http://localhost:8000/modele/getone/${modelId}`;

    return fetch(url)
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

function getOptionsByModelId(modelId) {
    const url = `http://localhost:8000/modele/getoption/${modelId}`;

    return fetch(url)
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

function getAllCommands() {
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

function loginUser(data) {
    return fetch('http://localhost:8000/utilisateur/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            const token = data.token;
            document.cookie = `Authorization=${token}; path=/`;
            console.log('Token stored successfully:', token);

            // Rediriger l'utilisateur après la connexion
            window.location.href = "./";
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function registerUser(data) {
    return fetch('http://localhost:8000/utilisateur/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            const token = data.token;
            document.cookie = `Authorization=${token}; path=/`;
            console.log('Token stored successfully:', token);

            // Rediriger l'utilisateur après la connexion
            window.location.href = "/raudifront/";
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function createCommand(data) {

    return fetch('http://localhost:8000/commande/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (response.ok) {
                console.log('Modèle commendé avec succès !');
                alert('Modèle commendé avec succès !');
                window.location.href = `index.html`;
                return response.json();
            } else {
                throw new Error('Erreur lors de la création de la commande');
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}

export async function getAllOptions() {
    const response = await fetch('http://localhost:8000/option/getall');
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Erreur lors de la récupération des options');
    }
}

export async function addModel(modelData) {
    const response = await fetch('http://localhost:8000/modele/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify(modelData),
    });

    if (response.ok) {
        alert('Modèle ajouté avec succes');
        console.log('Modèle ajouté avec succès !');
        window.location.href = `index.html`;
    } else {
        alert('Vous devez être connecté en tant qu\'admin pour ajouter un modèle');
        window.location.href = 'index.html';
        throw new Error('Erreur lors de l\'ajout du modèle');
    }
}

function getModelImageById(modelId) {
    const url = `http://localhost:8000/modele/getimage/${modelId}`;

    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erreur lors de la requête pour l\'image du modèle');
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}
// export async function getAllOptions() {
//     const response = await fetch('http://localhost:8000/option/getall');
//     if (response.ok) {
//         return response.json();
//     } else {
//         throw new Error('Erreur lors de la récupération des options');
//     }
// }

export async function addOption(optionData) {
    const response = await fetch('http://localhost:8000/option/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify(optionData),
    });

    if (response.ok) {
        console.log('Option ajoutée avec succès !');
        alert('Option ajouté avec succès');
        window.location.href = `index.html`;
    } else {
        alert('Vous devez être connecté en tant qu\'admin pour ajouter un modèle');
        window.location.href = 'index.html';
        throw new Error('Erreur lors de l\'ajout du modèle');
    }
}

export { getModelImageById };

export { createCommand }

export { registerUser };

export { loginUser };

export { getAllModels };

export { getOneModelById };

export { getOptionsByModelId };

export { getAllCommands };