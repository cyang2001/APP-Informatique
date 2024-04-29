document.getElementById('loadData').addEventListener('click', function() {
    fetch('index.php?action=showDatabase', {
        method: 'GET'})
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('dataTable');
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${item.id}</td><td>${item.name}</td><td>${item.email}</td>`;
                table.appendChild(row);
            });
        });
});