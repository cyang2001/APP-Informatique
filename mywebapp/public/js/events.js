// Variable pour suivre l'état du formulaire
var formulaireVisible = false;

function toggleFormulaire() {
    var dropdownContent = document.getElementById("myDropdown");
    if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
        formulaireVisible = false;
    } else {
        dropdownContent.style.display = "block";
        formulaireVisible = true;
    }
}


function cacherFormulaire() {
    var dropdownContent = document.getElementById("myDropdown");
    dropdownContent.style.display = "none";
}


function ajouterElement() {
    var nom = document.getElementById("nom").value;
    var dateString = document.getElementById("date").value;
    var heure = document.getElementById("heure").value;
    var adresse = document.getElementById("adresse").value;
    var illustrationFile = document.getElementById("illustration").files[0]; // Récupère le fichier d'illustration
    var illustrationURL = URL.createObjectURL(illustrationFile); // Crée une URL objet à partir du fichier

    // Créer un objet Date à partir de la chaîne de date
    var date = new Date(dateString);
    var annee = date.getFullYear();
    var mois = date.getMonth() + 1;
    var jour = date.getDate();

    var gridContainer = document.getElementById("gridContainer");
    var gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    gridItem.style.backgroundImage = "url('" + illustrationURL + "')"; // Définir l'image de fond
    gridItem.innerHTML = `
    <div class="event-text">
        <p class="text-p"><b><${nom}/b></p>
        <p class="text-p"><b>${jour}</b> ${moisArray[mois - 1]} ${annee}</p>
        <p class="text-p"><strong>à</strong> ${heure}</p>
        <p class="text-p"><b>${adresse}</b></p>
    </div>
    <button class="delete-button" onclick="supprimerElement(this.parentNode)"><b>×</b></button>
  `;
    gridContainer.appendChild(gridItem);

    // Nettoyer les champs du formulaire
    document.getElementById("nom").value = "";
    document.getElementById("date").value = "";
    document.getElementById("heure").value = "";
    document.getElementById("adresse").value = "";
    document.getElementById("illustration").value = ""; // Assurez-vous de réinitialiser la valeur du champ de fichier

    // Cacher le formulaire une fois l'élément ajouté
    toggleFormulaire();

    fetch('/index.php?action=ajouterEvenement', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nom, date, heure, adresse, description }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout de l\'événement');
            }
            return response.json();
        })
        .then(data => {
            // Traitez la réponse si nécessaire
            console.log(data);
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}



// Tableau des noms des mois
var moisArray = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];


function supprimerElement(gridItem) {
    var gridContainer = document.getElementById("gridContainer");
    gridContainer.removeChild(gridItem);

}

