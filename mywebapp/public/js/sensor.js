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
            } else {
                console.error('No data received');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});
