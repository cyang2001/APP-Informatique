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
}

window.addEventListener('beforeunload', function(event) {
    fetch('index.php?action=logout', {
        method: 'GET'
    }).catch(error => console.error('Error on logout:', error));
});
