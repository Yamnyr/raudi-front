// includeHeader.js

document.addEventListener('DOMContentLoaded', () => {
    // Charger le fichier header.html et l'inclure dans la balise avec l'id "headerContainer"
    fetch('header.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('headerContainer').innerHTML = html;
        });
});
