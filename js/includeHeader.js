// import { getCookie } from './token.js';

document.addEventListener('DOMContentLoaded', () => {
    // Charger le fichier header.html et l'inclure dans la balise avec l'id "headerContainer"
    fetch('header.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('headerContainer').innerHTML = html;
        });
});
// document.addEventListener('DOMContentLoaded', () => {
//     const loginLink = document.getElementById('loginLink');
//     const registerLink = document.getElementById('registerLink');
//
//     if (loginLink && registerLink) {
//         // Récupère le token
//         const token = getCookie('Authorization');
//         console.log(token);
//
//         // Si le token est présent, masque les liens de connexion et d'inscription
//         if (token) {
//             loginLink.style.display = 'none';
//             registerLink.style.display = 'none';
//         } else {
//             // Si le token est absent, masque les liens de déconnexion et de profil
//             loginLink.style.display = 'block';  // or 'inline' or 'inline-block' depending on your styling
//             registerLink.style.display = 'block';  // same here
//         }
//     } else {
//         console.error("Couldn't find loginLink or registerLink elements.");
//     }
// });
