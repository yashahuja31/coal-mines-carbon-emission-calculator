import got from 'got';

const CLIMATIQ_API_KEY = "14APE8BT6WMH6JMQA4QEV39VJGS6";

async function getElectricityEstimate() {
    try {
        const response = await got.post("https://beta2.api.climatiq.io/estimate", {
            headers: {
                "Authorization": `Bearer ${CLIMATIQ_API_KEY}`,
                "Content-Type": "application/json" // Ensure Content-Type is specified
            },
            responseType: "json",
            json: {
                emission_factor: "electricity-energy_source_grid_mix",
                parameters: {
                    energy: 900,
                    energy_unit: "kwh"
                }
            }
        });

        console.log(`Electricity Emissions: ${response.body.co2e.toFixed(2)}kg`);
    } catch (error) {
        console.error('Error fetching electricity estimate:', error.message);
    }
}

getElectricityEstimate();
