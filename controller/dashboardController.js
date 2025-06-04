
import { DataModel } from '../model/dataModel.js';
import { DashboardView } from '../view/dashboardView.js';

export const dashboardController = {
    async init() {
        await DataModel.fetchData();
        DashboardView.render(DataModel.data);
    },
    async addData(month, sales) {
        console.log('Evento addData recibido en el controlador');
        try {
            await DataModel.addData(month, sales);
            DashboardView.render(DataModel.data);
        } catch (error) {
            console.error('Error al agregar datos:', error);
            DashboardView.showError('Error al agregar datos');
        }
    },
    async resetData() {
        try {
            await DataModel.resetData();
            DashboardView.render(DataModel.data);
        } catch (error) {
            console.error('Error al reiniciar datos:', error);
            DashboardView.showError('Error al reiniciar datos');
        }
    },
    async deleteData(index) {
        try {
            await DataModel.deleteData(index);
            DashboardView.render(DataModel.data);
        } catch (error) {
            console.error('Error al eliminar datos:', error);
            DashboardView.showError('Error al eliminar datos');
        }
    },
    async viewAllData() {
        const noViewAllDataBtn = document.getElementById('noViewAllDataBtn');
        noViewAllDataBtn.style.display = 'block';
        const viewAllDataBtn = document.getElementById('viewAllDataBtn');
        viewAllDataBtn.style.display = 'none';
        const sectionTwo = document.getElementsByClassName('section-two');
        sectionTwo[0].style.display = 'block';
    },
    async noViewAllData() {
        const viewAllDataBtn = document.getElementById('viewAllDataBtn');
        viewAllDataBtn.style.display = 'block';
        const noViewAllDataBtn = document.getElementById('noViewAllDataBtn');
        noViewAllDataBtn.style.display = 'none';
        const sectionTwo = document.getElementsByClassName('section-two');
        sectionTwo[0].style.display = 'none';
    }
};