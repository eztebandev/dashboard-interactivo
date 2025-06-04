import { dashboardController } from '../controller/dashboardController.js';

export const DashboardView = {
    chart: null,

    render(data) {
        try {
            const container = document.getElementById('container');
            container.innerHTML = `
                <div class="navbar">
                    <h2 class="title">Dashboard de Ventas</h2>
                    <div class="button-group">
                        <button id="viewAllDataBtn" class="btn">Ver datos</button>
                        <button id="noViewAllDataBtn" class="btn">Ocultar datos</button>
                        <button id="resetDataBtn" class="btn">Reiniciar</button>
                    </div>
                </div>
                <div class="dashboard">
                    
                    <div class="section-one">
                    
                        <div class="chart-container">
                            <canvas id="salesChart"></canvas>
                        </div>

                    </div>
                    <div class="section-two">
                    
                        <div class="form-container">
                            <div class="input-group">
                                <input type="text" id="month" placeholder="Mes" required>
                                <input type="number" id="sales" placeholder="Ventas" required>
                            </div>
                            <div class="button-group">
                                <button id="addDataBtn" class="btn btn-primary">Agregar</button>
                            </div>
                        </div>
                    
                        <p class="error-message" id="error-message"></p>

                        <div class="table-container">
                            <table class="sales-table">
                                <thead>
                                    <tr>
                                        <th>Mes</th>
                                        <th>Ventas</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="salesTableBody"></tbody>
                            </table>
                        </div>

                    </div>
                </div>
            `;

            this.initializeChart(data);
            this.updateTable(data);
            this.addEventListeners();
        } catch (error) {
            console.error('Error al renderizar el dashboard:', error);
            this.showError('Error al cargar el dashboard');
        }
    },

    initializeChart(data) {
        try {
            const ctx = document.getElementById('salesChart').getContext('2d');
            if (this.chart) {
                this.chart.destroy();
            }
            
            this.chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.labels,
                    datasets: [{
                        label: 'Ventas Mensuales',
                        data: data.values,
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Ventas'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Mes'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top'
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Error al inicializar el gráfico:', error);
            this.showError('Error al cargar el gráfico');
        }
    },

    addEventListeners() {
        document.getElementById('addDataBtn').addEventListener('click', () => {
            const month = document.getElementById('month').value;
            const sales = document.getElementById('sales').value;
            
            if (!month || !sales) {
                const errorElement = document.getElementById('error-message');
                errorElement.textContent = 'Por favor complete todos los campos';
                errorElement.style.display = 'block';
                setTimeout(() => {
                    errorElement.style.display = 'none';
                }, 3000);
                return;
            }
            dashboardController.addData(month, Number(sales));
        });
    
        document.getElementById('resetDataBtn').addEventListener('click', () => {
            dashboardController.resetData();
        });
    
        document.getElementById('salesTableBody').addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-btn')) {
                const index = Number(e.target.dataset.index);
                dashboardController.deleteData(index);
            }
        });

        document.getElementById('viewAllDataBtn').addEventListener('click', () => {
            dashboardController.viewAllData();
        });

        document.getElementById('noViewAllDataBtn').addEventListener('click', () => {
            dashboardController.noViewAllData();
        });
    },

    updateTable(data) {
        try {
            const tableBody = document.getElementById('salesTableBody');
            tableBody.innerHTML = '';
            
            data.labels.forEach((month, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${month}</td>
                    <td>${data.values[index].toLocaleString()}</td>
                    <td>
                        <button class="delete-btn" data-index="${index}">
                            Eliminar
                        </button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error al actualizar la tabla:', error);
            this.showError('Error al actualizar la tabla');
        }
    },

    showError(message) {
        const errorElement = document.getElementById('error-message');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 3000);
    }
};

