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
