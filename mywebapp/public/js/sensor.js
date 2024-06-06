document.addEventListener('DOMContentLoaded', function() {
    fetch('index.php?action=getSensorData')
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {

                var labels = data.map(function(e) {
                    return new Date(e.date_heure);
                });
                var niveaux_db = data.map(function(e) {
                    return e.niveau_db;
                });

                var ctxSound = document.getElementById('soundLevelChart').getContext('2d');
                var soundLevelChart = new Chart(ctxSound, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Niveau Sonore (dB)',
                            data: niveaux_db,
                            borderColor: 'rgb(255, 99, 132)',
                            fill: false,
                            pointRadius: 5,
                            pointHoverRadius: 7
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                type: 'time',
                                time: {
                                    unit: 'minute'
                                }
                            },
                            y: {
                                beginAtZero: true
                            }
                        },
                        plugins: {
                            tooltip: {
                                enabled: true,
                                callbacks: {
                                    label: function(context) {
                                        return context.dataset.label + ': ' + context.raw + ' dB';
                                    }
                                }
                            }
                        }
                    }
                });
            } else {
                console.error('No data received');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});



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
                .then(() => location.reload())
                .catch(error => console.error('Error on logout:', error));
            });
        } else {
            menu.innerHTML = '<a href="./login_fr.html">Se connecter</a><a href="./register_fr.html">S\'inscrire</a>';
        }
    })
    .catch(error => {
        console.error('Error fetching user info:', error);
    });
};


document.addEventListener('scroll', function() {
    const parallaxElement = document.querySelector('.banniere img');
    const speed = 0.5;
    var windowScroll = window.pageYOffset;
    parallaxElement.style.transform = 'translateY(' + windowScroll * speed + 'px)';
});

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


window.addEventListener('beforeunload', function(event) {
    fetch('index.php?action=logout', {
        method: 'GET'
    }).catch(error => console.error('Error on logout:', error));
});
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

