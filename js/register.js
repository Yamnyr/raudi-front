// register.js

import { registerUser } from './api.js';

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
});