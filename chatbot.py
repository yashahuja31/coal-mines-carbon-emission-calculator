import os

import mysql.connector

from langchain_google_genai import ChatGoogleGenerativeAI

from flask_cors import CORS
from flask import Flask, request, jsonify, session

app = Flask(__name__)
app.secret_key = "1234"
CORS(app)

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="1234vedant@S",
        database="carbonEmissionData"
    )

@app.route('/fetch-data', methods=['GET'])
def fetch_data():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("SELECT * FROM coaldata")
    coaldata = cursor.fetchall()

    session['coal_data'] = coaldata
    print(coaldata)
    return jsonify(coaldata)



    
os.environ["LANGCHAIN_TRACING_V2"] = "true"
os.environ["LANGCHAIN_API_KEY"] = "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"
os.environ["GOOGLE_PROJECT_ID"] = "160796425516"
os.environ["GOOGLE_API_KEY"] = "AIzaSyBnsk95zYg4cpjnu9TGpG091lYH0YpX09A"



@app.route('/chatbot', methods=['POST'])
def chatBot():
    model = ChatGoogleGenerativeAI(
        model="gemini-1.5-pro",
        temperature=1,
        max_tokens=None,
        timeout=None,
        max_retries=2,
        # other params...
    )
    user_input = request.json.get('message')
    coal_data = session.get('coal_data', None)
    if not coal_data:
        print(coal_data)
        return jsonify({"response": "Please fetch the data first."})
    
    data_string = f"Here is the data i have DT means date , YTD_PROD means year to date production, ONDT_PROD means ONDT produciton , YTD_OFFTAKE means year to date offtake , ONDT_OFFTAKE means ONDT offtake : {coal_data}"
    message = [
        ("system", "You are a helpful assistant",
        ),
        ("human", data_string),
        ("human", user_input),
    ]


    ai_msg =  model.invoke(message)
    return jsonify({"response" : ai_msg.content})

if __name__ == "__main__":
    app.run(debug=True)