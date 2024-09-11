let emissionChart;  

function calculateAndVisualize() {

    const coalAmount = parseFloat(document.getElementById('coalAmount').value) || 0;
    const carbonContent = parseFloat(document.getElementById('carbonContent').value) || 0;
    const electricityUsed = parseFloat(document.getElementById('electricityUsed').value) || 0;
    const fuelDistance = parseFloat(document.getElementById('fuelDistance').value) || 0;
    const fuelConsumption = parseFloat(document.getElementById('fuelConsumption').value) || 0;
    const fuelType = document.getElementById('fuelType').value;

    const emissionFactors = {
        diesel: 0.00268,
        gasoline: 0.00231,
        naturalGas: 0.00275
    };
    
    const emissionFactor = emissionFactors[fuelType] || 0;

    const coalCarbonEmissions = coalAmount * (carbonContent / 100) * 3.67;
    const electricityCarbonEmissions = electricityUsed * 0.0085; // Adjust this based on local factors
    const transportationCarbonEmissions = fuelDistance * fuelConsumption * emissionFactor;

    document.getElementById('coalEmissions').textContent = Coal Excavation Emissions: ${coalCarbonEmissions.toFixed(2)} t CO₂;
    document.getElementById('electricityEmissions').textContent = Electricity Emissions: ${electricityCarbonEmissions.toFixed(2)} t CO₂;
    document.getElementById('transportationEmissions').textContent = Transportation Emissions: ${transportationCarbonEmissions.toFixed(2)} t CO₂;

    let data = {
        labels: ['Coal Excavation', 'Electricity', 'Transportation'],
        datasets: [{
            label: 'Carbon Emissions (t CO₂)',
            data: [coalCarbonEmissions, electricityCarbonEmissions, transportationCarbonEmissions],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            borderColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            borderWidth: 1
        }]
    };

    if (emissionChart) {
        emissionChart.destroy();
    }

    const ctx = document.getElementById('emissionChart').getContext('2d');
    emissionChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}