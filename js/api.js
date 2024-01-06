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
            window.location.href = "/raudifront/";
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
        console.log('Modèle ajouté avec succès !');
    } else {
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

export { getModelImageById };

export { createCommand }

export { registerUser };

export { loginUser };

// Exporte la fonction pour l'utiliser dans d'autres fichiers
export { getAllModels };

// Exporte la fonction pour l'utiliser dans d'autres fichiers
export { getOneModelById };

// Exporte la fonction pour l'utiliser dans d'autres fichiers
export { getOptionsByModelId };

// Exporte la fonction pour l'utiliser dans d'autres fichiers
export { getAllCommands };


// http://localhost:8000/option/getall/:id
// http://localhost:8000/modele/add/