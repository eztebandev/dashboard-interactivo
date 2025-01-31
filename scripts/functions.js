const ctx = document.getElementById('salesChart').getContext('2d');
let salesData = JSON.parse(localStorage.getItem('salesData')) || {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    values: [5000, 7000, 8000, 6000, 9000]
};

const salesChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: salesData.labels,
        datasets: [{
            label: 'Ventas Mensuales',
            data: salesData.values,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

function updateTable() {
    const tableBody = document.getElementById('salesTableBody');
    tableBody.innerHTML = '';
    salesData.labels.forEach((month, index) => {
        const row = `<tr>
            <td>${month}</td>
            <td>${salesData.values[index]}</td>
            <td><button class="delete-btn" onclick="deleteData(${index})">Eliminar</button></td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

function addData() {
    const month = document.getElementById('month').value.trim();
    const sales = parseFloat(document.getElementById('sales').value);
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = "";
    
    if (!month || isNaN(sales)) {
        errorMessage.textContent = "Por favor, ingresa un mes y una cantidad válida.";
        return;
    }
    
    if (salesData.labels.includes(month)) {
        errorMessage.textContent = "El mes ya existe en los datos. Ingresa un mes diferente.";
        return;
    }
    
    salesData.labels.push(month);
    salesData.values.push(sales);
    
    salesChart.data.labels = salesData.labels;
    salesChart.data.datasets[0].data = salesData.values;
    salesChart.update();
    
    localStorage.setItem('salesData', JSON.stringify(salesData));
    updateTable();
}

function deleteData(index) {
    salesData.labels.splice(index, 1);
    salesData.values.splice(index, 1);
    
    salesChart.data.labels = salesData.labels;
    salesChart.data.datasets[0].data = salesData.values;
    salesChart.update();
    
    localStorage.setItem('salesData', JSON.stringify(salesData));
    updateTable();
}

function resetData() {
    localStorage.removeItem('salesData');
    salesData = { labels: [], values: [] };
    salesChart.data.labels = [];
    salesChart.data.datasets[0].data = [];
    salesChart.update();
    updateTable();
}

updateTable();