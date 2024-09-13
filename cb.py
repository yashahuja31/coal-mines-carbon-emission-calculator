import requests
from google.oauth2 import service_account
from google.auth.transport.requests import Request
import matplotlib.pyplot as plt
import io
from PIL import Image
import base64


gen_ai_api_key = "AIzaSyBznWJ65v2wI_jWoltqZiFivyS3MGs2FZQ"

gen_ai_api_url = "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText"

# Step 4: Function to get OAuth 2.0 Access Token
def get_access_token():
    # Path to your service account credentials file (replace with actual path)
    credentials = service_account.Credentials.from_service_account_file(
        'path_to_your_service_account_file.json',  # Update this path
        scopes=['https://www.googleapis.com/auth/cloud-platform']
    )

    # Refresh and retrieve the token
    credentials.refresh(Request())
    return credentials.token


# Step 5: Call Google PaLM API with the Access Token
def call_gen_ai_api(prompt):
    access_token = get_access_token()

    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }

    data = {
        "prompt": prompt,
        "max_tokens": 100  # Adjust this as needed
    }

    api_url = "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText"

    response = requests.post(api_url, headers=headers, json=data)

    if response.status_code == 200:
        return response.json()["candidates"][0]["output"]  # Adjust based on API response structure
    else:
        return f"Error: {response.status_code}, {response.text}"


# Function to generate a graph using matplotlib
def generate_graph(data):
    fig, ax = plt.subplots()
    ax.bar(data.keys(), data.values())
    ax.set_title('Sample Graph')
    ax.set_xlabel('Categories')
    ax.set_ylabel('Values')

    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)

    img = Image.open(buf)
    buffered = io.BytesIO()
    img.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode('utf-8')

    buf.close()
    buffered.close()

    return img_str


# Chatbot function
def chatbot(user_input):
    # Call the Google PaLM API
    response = call_gen_ai_api(user_input)

    # Check if the user is requesting a graph
    if "graph" in user_input.lower():
        data = {"Category A": 10, "Category B": 15, "Category C": 7}
        graph_image = generate_graph(data)
        graph_html = f'<img src="data:image/png;base64,{graph_image}" alt="Graph" />'
        return f"{response}\n\nHere is the graph:\n{graph_html}"
    else:
        return response


# Example usage
user_input = input("")
bot_response = chatbot(user_input)
print(bot_response)
