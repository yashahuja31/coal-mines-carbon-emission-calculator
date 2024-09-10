import pycurl
from io import BytesIO
import json

# Initialize buffer to hold the response
buffer = BytesIO()

# Initialize pycurl object
curl = pycurl.Curl()

# Set the URL for the request
curl.setopt(curl.URL, "https://www.carboninterface.com/api/v1/estimates")

# Set the HTTP method to POST
curl.setopt(curl.CUSTOMREQUEST, "POST")

# Set headers using HTTPHEADER option
headers = [
    'Authorization: G6AEZGOMjQ2jsY5eYRT8sA',
    'Content-Type: application/json'
]
curl.setopt(curl.HTTPHEADER, headers)

# Define the data payload
data = {
    "type": "vehicle",
    "distance_unit": "mi",
    "distance_value": 100,
    "vehicle_model_id": "7268a9b7-17e8-4c8d-acca-57059252afe9"
}

# Convert the data to JSON and set it as POSTFIELDS
curl.setopt(curl.POSTFIELDS, json.dumps(data))

# Write the response data to the buffer
curl.setopt(curl.WRITEDATA, buffer)

# Perform the request
curl.perform()

# Close the curl session
curl.close()

# Get the response from the buffer
response = buffer.getvalue()

# Print the response
print(response.decode('utf-8'))
