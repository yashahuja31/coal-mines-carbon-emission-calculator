import requests
import json

CLIMATIQ_API_KEY = '14APE8BT6WMH6JMQA4QEV39VJGS6' 

url = 'https://api.climatiq.io/data/v1/search'

# url = 'https://api.climatiq.io/data/v1/estimate'

params = {
    "activity_id": "electricity-supply_grid-source_residual_mix",
    "data_version": "^6",
    "region": "IN"  
}

headers = {
    'Authorization': f'Bearer {CLIMATIQ_API_KEY}',
    'Content-Type': 'application/json'
}


response = requests.get(url, headers=headers, params=params)


if response.status_code == 200:
    print('Response:', response.json())
else:
    print('Failed with status code:', response.status_code)
    print('Error:', response.text)
