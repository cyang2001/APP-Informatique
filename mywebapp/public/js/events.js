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
    var illustrationFile = document.getElementById("illustration").files[0]; // Récupère le fichier d'illustration
    var illustrationURL = URL.createObjectURL(illustrationFile); // Crée une URL objet à partir du fichier

    // Créer un objet Date à partir de la chaîne de date
    var date = new Date(dateString);
    var annee = date.getFullYear();
    var mois = date.getMonth() + 1;
    var jour = date.getDate();

    var gridContainer = document.getElementById("gridContainer");
    // Si nous ajoutons un nouvel élément
    var gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    gridItem.style.backgroundImage = "url('" + illustrationURL + "')"; // Définir l'image de fond
    gridItem.innerHTML = `
        <div class="event-text">
        <p><b><strong></strong>${nom}</b></p>
        <p><b><strong></strong>${jour} ${moisArray[mois - 1]} ${annee}</b></p>
        <p><b><strong>à </strong>${heure}</b></p>
        <p><b><strong></strong>${adresse}</b></p>
        <p><b><strong></strong>${description}</b></p>
        </div>
        <button class="delete-button" onclick="supprimerElement(this.parentNode)"><b>×</b></button>
        `;
        gridContainer.appendChild(gridItem);

        // Nettoyer les champs du formulaire
        document.getElementById("nom").value = "";
        document.getElementById("date").value = "";
        document.getElementById("heure").value = "";
        document.getElementById("adresse").value = "";
        document.getElementById("illustration").value = "";
        document.getElementById("description").value = "";
        // Cacher le formulaire une fois l'élément ajouté
        toggleFormulaire();

    // Rediriger l'utilisateur lorsqu'il clique sur l'élément ajouté
    gridItem.addEventListener('click', function(event) {
        if (event.target.classList.contains('grid-item')) {
            window.location.href = 'billetterie.html';
        }
    });


    // Effectuer l'ajout de l'événement via une requête AJAX
        fetch('index.php?action=addMeeting', { // english !!!!!!!!!!!!!!! pas ajouterEvenement!!!!!!!!! et puis il n y a pas /
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nom, date, heure, adresse, description }),
        }).then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de l\'ajout de l\'événement');
                }
                return response.json();
            })
            .then(data => {
                gridContainer.setAttribute('ID_MEETING', data.idMeeting);
            })
            .catch(error => {
                console.error('Erreur:', error);
            });


}




// Tableau des noms des mois
var moisArray = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];


function supprimerElement(gridItem) {
    var gridContainer = document.getElementById("gridContainer");
    fetch('index.php?action=deleteMeeting', { // english !!!!!!!!!!!!!!! pas supprimerEvenement!!!!!!!!! et puis il n y a pas / 
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idMeeting: gridItem.getAttribute('ID_MEETING') }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la suppression de l\'événement');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
    gridContainer.removeChild(gridItem);

}



window.onload = function() {
    fetch('index.php?action=getUserInfo', {
        method: 'GET'
    })
    .then(response => response.json()) 
    .then(data => { 
        console.log(data);  
        const menu = document.querySelector('.menu-deroulant div');
        menu.innerHTML = ''; 
        
        if (data.email) {
            menu.innerHTML = '<a href="#" id="logout">Se déconnecter</a>';
            document.getElementById('logout').addEventListener('click', function(event) {
                event.preventDefault();
                fetch('index.php?action=logout', {
                    method: 'GET'
                })
                .then(() => location.reload());
            });
        } else {
            menu.innerHTML = '<a href="./login_fr.html">Se connecter</a><a href="./register_fr.html">S\'inscrire</a>';
        }
    })
    .catch(error => {
        console.error('Error fetching user info:', error);
    });

};


/*window.addEventListener('beforeunload', function(event) {
    fetch('index.php?action=logout', {
        method: 'GET'
    }).catch(error => console.error('Error on logout:', error));
});*/
function handleMenuButtonClick() {
    var checkbox = document.getElementById('menu_toggle');
    checkbox.checked = !checkbox.checked;
}

document.addEventListener('DOMContentLoaded', function() {


    fetch('index.php?action=getUserInfo')
        .then(response => response.json())
        .then(data => {
            console.log('User info:', data);

            const userAccessLevel = data.accessLevel !== undefined ? data.accessLevel : 0;
            console.log(userAccessLevel)
            loadMenu(userAccessLevel);
        })
        .catch(error => {
            console.error('Error fetching user info:', error);
            alert('An error occurred while fetching user info. Please try again later.');
        });


    function loadMenu(userAccessLevel) {
        fetch('index.php?action=getPages')
            .then(response => response.json())
            .then(data => {
                console.log('Pages:', data);
                const menuBox = document.querySelector('.menu_box');
                menuBox.innerHTML = ''; 
                data.forEach(page => {
                    if (userAccessLevel >= page.ID_ACCESS_LEVEL) {
                        const li = document.createElement('li');
                        const a = document.createElement('a');
                        a.className = 'menu_item';
                        a.href = page.PAGE_URL;
                        a.textContent = page.PAGE_NAME;
                        li.appendChild(a);
                        menuBox.appendChild(li);
                        console.log('Appended item:', a);
                    }
                });
            })
            .catch(error => {
                console.error('Error loading pages:', error);
                alert('An error occurred while loading pages. Please try again later.');
            });
    }
});


