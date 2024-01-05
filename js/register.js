// register.js

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Récupère les valeurs du formulaire
        const nom = document.getElementById('nom').value;
        const prenom = document.getElementById('prenom').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('mdp').value;

        // Appelle la fonction pour s'inscrire via l'API
        registerUser({ nom, prenom, email, mdp: password });
    });

    function registerUser(data) {
        fetch('http://localhost:8000/utilisateur/register', {
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
});
