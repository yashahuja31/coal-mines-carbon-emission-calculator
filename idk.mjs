// const electricityEstimate = await got.post("https://beta2.api.climatiq.io/estimate", {

//     header: {
//         "Authorization": 'Bearer 14APE8BT6WMH6JMQA4QEV39VJGS6'
//     }, 
//     responseType: "json",
//     json: {
//         emission_factor: "electricity-enerygy_source_grid_mix",
//         parameters: {
//             energy: 900,
//             energy_unit: 'kWh'
//         }
//     }
// });

import got from 'got';  // Importing got in ES module syntax

async function estimateElectricity() {
    try {
        const electricityEstimate = await got.get("https://api.climatiq.io/data/v1/search", {
            headers: {
                "Authorization": 'Bearer 14APE8BT6WMH6JMQA4QEV39VJGS6',
                "Content-Type": "application/json"  // Ensure the content type is JSON
            },
            responseType: "json",
            json: {  // Use 'json' for the body
                emission_factor: "electricity-energy_source_grid_mix",
                parameters: {
                    energy: 900,
                    energy_unit: 'kWh'
                }
            }
        });

        console.log(electricityEstimate.body);
    } catch (error) {
        console.error(`Error estimating electricity: ${error.response?.statusCode} - ${error.response?.body}`);
    }
}

estimateElectricity();
