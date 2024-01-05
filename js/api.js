// api.js

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

// Exporte la fonction pour l'utiliser dans d'autres fichiers
export { getAllModels };

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


// api.js

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

// Exporte la fonction pour l'utiliser dans d'autres fichiers
export { getOptionsByModelId };


// Exporte la fonction pour l'utiliser dans d'autres fichiers
export { getOneModelById };