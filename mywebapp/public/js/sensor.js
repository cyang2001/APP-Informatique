


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
    var soundLevelChart = null;

    const fetchData = () => {
        fetch('index.php?action=getSensorData')
            .then(response => response.json())
            .then(data => {
                console.log('Data received:', data);

                if (data.length > 0) {
                    var labelsAndDates = data.map(function(e) {
                        return {
                            type: e.TYP,
                            label: moment(`${e.YEAR}-${e.MONTH}-${e.DAY}T${e.HOUR}:${e.MIN}:${e.SEC}Z`).format('YYYY-MM-DD HH:mm:ss'),
                            date: new Date(`${e.YEAR}-${e.MONTH}-${e.DAY}T${e.HOUR}:${e.MIN}:${e.SEC}Z`),
                            temperature: parseInt(e.VAL, 16) / 100,  
                            niveau_db: parseInt(e.VAL, 16) / 100
                        };
                    });

                    console.log('Labels and Dates:', labelsAndDates);

                    var now = new Date();
                    var filteredData = labelsAndDates.filter(item => (now - item.date) < 3 * 60 * 1000);

                    filteredData.sort((a, b) => a.date - b.date);
                    var latestData = filteredData.slice(-20);

                    var dataType = document.getElementById('dataTypeSelector').value;
                    var labels = latestData.map(item => item.label);
                    var dataToDisplay = latestData.filter(item => item.type === (dataType === 'temperature' ? '3' : '9'))
                                                  .map(item => dataType === 'temperature' ? item.temperature : item.niveau_db);

                    console.log('Filtered Labels:', labels);
                    console.log('Data to Display:', dataToDisplay);

                    var ctxSound = document.getElementById('soundLevelChart').getContext('2d');

                    if (soundLevelChart !== null) {
                        soundLevelChart.destroy();
                        soundLevelChart = null;
                    }

                    soundLevelChart = new Chart(ctxSound, {
                        type: 'line',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: dataType === 'temperature' ? 'Température (°C)' : 'Niveau Sonore (dB)',
                                data: dataToDisplay,
                                borderColor: 'rgb(255, 99, 132)',
                                fill: false,
                                pointRadius: 5,
                                pointHoverRadius: 7,
                                hitRadius: 10,
                                hoverRadius: 7
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                x: {
                                    type: 'time',
                                    time: {
                                        unit: 'minute',
                                        tooltipFormat: 'YYYY-MM-DD HH:mm:ss',
                                        displayFormats: {
                                            minute: 'YYYY-MM-DD HH:mm:ss'
                                        }
                                    },
                                    title: {
                                        display: true,
                                        text: 'Time'
                                    }
                                },
                                y: {
                                    beginAtZero: true,
                                    title: {
                                        display: true,
                                        text: dataType === 'temperature' ? 'Température (°C)' : 'Niveau Sonore (dB)'
                                    }
                                }
                            },
                            plugins: {
                                tooltip: {
                                    enabled: true,
                                    callbacks: {
                                        label: function(context) {
                                            return context.dataset.label + ': ' + context.raw + (dataType === 'temperature' ? ' °C' : ' dB');
                                        }
                                    }
                                }
                            }
                        }
                    });

                    console.log('Chart created');
                } else {
                    console.error('No data received');
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    document.getElementById('dataTypeSelector').addEventListener('change', fetchData);

    setInterval(fetchData, 5000);
    fetchData();

    document.getElementById('sendDataButton').addEventListener('click', () => {
        const trame = constructTrame({
            TRA: '1',
            OBJ: 'G10C',
            REQ: '2',
            TYP: '9',
            NUM: '01',
            VAL: '0001',  
            TIM: '0001',  
            CHK: '67'
        });

        fetch('index.php?action=sendDataToEnergia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ trame })
        })
        .then(response => {
            if (response.ok) {
                console.log('Data sent successfully to Energia');
            } else {
                console.error('Error sending data to Energia');
            }
        })
        .catch(error => console.error('Error sending data to Energia:', error));
    });

    function constructTrame(data) {
        return `${data.TRA}${data.OBJ}${data.REQ}${data.TYP}${data.NUM}${data.VAL}${data.TIM}${data.CHK}`;
    }
});


