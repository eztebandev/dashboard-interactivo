let salesData = JSON.parse(localStorage.getItem('salesData')) || {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    values: [5000, 7000, 8000, 6000, 9000]
};

export const DataModel = {
    data: [],
    async fetchData() {
        this.data = salesData;
        console.log('Datos obtenidos:', this.data);
    },
    async addData(month, sales) {
        this.data.labels.push(month);
        this.data.values.push(sales);
        localStorage.setItem('salesData', JSON.stringify(this.data));
    },
    async resetData() {
        this.data.labels = [];
        this.data.values = [];
        localStorage.removeItem('salesData');
    },
    async deleteData(index) {
        this.data.labels.splice(index, 1);
        this.data.values.splice(index, 1);
        localStorage.setItem('salesData', JSON.stringify(this.data));
    }
};
