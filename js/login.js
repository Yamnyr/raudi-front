// login.js

import { loginUser } from './api.js';

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
});