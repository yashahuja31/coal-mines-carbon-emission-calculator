// document.getElementById('emission-form').addEventListener('submit', function(e) {
//     e.preventDefault();

//     const formData = {
//         excavationAmount: document.getElementById('excavation-amount').value,
//         transportDistance: document.getElementById('transport-distance').value,
//         transportMethod: document.getElementById('transport-method').value,
//         equipmentHours: document.getElementById('equipment-hours').value,
//         equipmentType: document.getElementById('equipment-type').value,
//         mineType: document.getElementById('mine-type').value
//     };

//     localStorage.setItem('emissionData', JSON.stringify(formData));

//     fetch('https://api.climatiq.io/data/v1/search', { 
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer 14APE8BT6WMH6JMQA4QEV39VJGS6' 
//         },
//         body: JSON.stringify(formData)
//     })
//     .then(response => response.json())
//     .then(data => {
//         localStorage.setItem('emissionApiResponse', JSON.stringify(data));

//         document.getElementById('results').style.display = 'block';
//         document.getElementById('total-emissions').textContent = data.totalEmissions || 'N/A'; 
//         document.getElementById('per-capita-emissions').textContent = data.perCapitaEmissions || 'N/A'; 

//         const chartContainer = document.getElementById('chart-container');
//         chartContainer.innerHTML = ''; 
//         if (data.chartUrl) {
//             const chart = document.createElement('img');
//             chart.src = data.chartUrl; 
//             chart.alt = 'Emission Chart';
//             chartContainer.appendChild(chart);
//         } else {
//             chartContainer.textContent = 'No chart available.';
//         }
//     })
//     .catch(error => {
//         console.error('Error fetching emissions data:', error);
//     });
// });
// carbon interface api key 1rXoGtaN2Yv6YmXHu6NaQ
import axios from 'axios';


const apiKey = '14APE8BT6WMH6JMQA4QEV39VJGS6';
const apiUrl = 'https://api.climatiq.io/data/v1/search';

const CLIMATIQ_API_KEY = apiKey;  // Replace with your actual Climatiq API key

const data = {
    emission_factor: {
        activity_id: "electricity-supply_grid-source_residual_mix",
        data_version: "^6"
    },
    parameters: {
        energy: 4200,
        energy_unit: "kWh"
    }
};

axios.post('https://api.climatiq.io/data/v1/estimate', data, {
    headers: {
        'Authorization': `Bearer ${CLIMATIQ_API_KEY}`,
        'Content-Type': 'application/json'
    }
})
.then(response => {
    console.log('Response:', response.data);
})
.catch(error => {
    console.error('Error:', error.message);
});

