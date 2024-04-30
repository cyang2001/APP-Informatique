document.getElementById('loadData').addEventListener('click', function() {
    fetch('index.php?action=showDatabase', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        const table = document.getElementById('dataTable');
        table.innerHTML = '';
        const header = document.createElement('tr');
        header.innerHTML = `<th>ID</th><th>Name</th><th>Email</th><th>Access Level</th><th>Ticket</th>`;
        table.appendChild(header);
        data.forEach(item => {
            const row = document.createElement('tr');
            const ticketDisplay = item.TICKET !== null ? item.TICKET : 'none ticket';
            row.innerHTML = `<td>${item.ID_USER}</td><td>${item.NAME}</td><td>${item.EMAIL}</td><td>${item.ID_ACCESS_LEVEL ?? 'none'}</td><td>${ticketDisplay}</td>`;
            table.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error loading the data:', error);
    });
});
