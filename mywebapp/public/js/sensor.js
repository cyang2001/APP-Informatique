document.addEventListener('DOMContentLoaded', function() {
    fetch('index.php?action=getSensorData')
        .then(response =>{response.json()
            console.log(response)
        } )

        .then(data => {
            var labels = data.map(function(e) {
                return e.date_heure;
            });
            var niveaux_db = data.map(function(e) {
                return e.niveau_sonore;
            });
        
            // Créer le graphique du niveau sonore
            var ctxSound = document.getElementById('soundLevelChart').getContext('2d');
            var soundLevelChart = new Chart(ctxSound, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Niveau Sonore (dB)',
                        data: niveaux_db,
                        borderColor: 'rgb(255, 99, 132)',
                        fill: false
                    }]
                },
                options: {
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
                    }
                }
            });
});
});