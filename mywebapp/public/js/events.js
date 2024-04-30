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
    var description = document.getElementById("description").value;

    // Créer un objet Date à partir de la chaîne de date
    var date = new Date(dateString);
    var annee = date.getFullYear();
    var mois = date.getMonth() + 1;
    var jour = date.getDate();

    var gridContainer = document.getElementById("gridContainer");
    var gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    gridItem.innerHTML = `
    <p><strong>Nom:</strong> ${nom}</p>
    <p><strong>Date:</strong> ${jour} ${moisArray[mois - 1]} ${annee}</p>
    <p><strong>Heure:</strong> ${heure}</p>
    <p><strong>Adresse:</strong> ${adresse}</p>
    <p><strong>Description:</strong> ${description}</p>
    <button class="delete-button" onclick="supprimerElement(this.parentNode)">Supprimer</button>
  `;
    gridContainer.appendChild(gridItem);

    // Nettoyer les champs du formulaire
    document.getElementById("nom").value = "";
    document.getElementById("date").value = "";
    document.getElementById("heure").value = "";
    document.getElementById("adresse").value = "";
    document.getElementById("description").value = "";

    // Cacher le formulaire une fois l'élément ajouté
    toggleFormulaire();
}



// Tableau des noms des mois
var moisArray = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];


function supprimerElement(gridItem) {
    var gridContainer = document.getElementById("gridContainer");
    gridContainer.removeChild(gridItem);

}
