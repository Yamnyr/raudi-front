// login.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Récupère les valeurs du formulaire
        const email = document.getElementById('email').value;
        const password = document.getElementById('mdp').value;

        // Appelle la fonction pour se connecter via l'API
        loginUser({ email, mdp: password });
    });

    function loginUser(data) {
        fetch('http://localhost:8000/utilisateur/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const token = data.token;
                document.cookie = `Authorization=${token}; path=/`;
                console.log('Token stored successfully:', token);

                // Rediriger l'utilisateur après la connexion
                // window.location.href = "/raudifront/";
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
});