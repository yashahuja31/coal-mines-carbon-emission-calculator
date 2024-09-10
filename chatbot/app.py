from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Optional for handling CORS if needed for cross-origin requests

@app.route('/')
def index():
    return render_template('index.html')  # Renders index.html from the templates folder

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    prompt = data.get('prompt')

    # Example response: You can integrate any NLP or chatbot model here
    response = f"You said: {prompt}. How can I help you further?"

    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True, port=5500)  # Runs the server on port 5000
