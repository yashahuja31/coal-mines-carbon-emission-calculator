import mysql.connector
import json
import requests


conn = mysql.connector.connect(
    host="your_host",
    user="your_user",
    password="your_password",
    database="your_database"
)
cursor = conn.cursor()

insert_query = """
INSERT INTO production_data (DT, UNIT_NAME, MATERIAL, YTD_PROD, ONDT_PROD, YTD_OFFTAKE, ONDT_OFFTAKE)
VALUES (%s, %s, %s, %s, %s, %s, %s);
"""



for row in data['rows']:
    cursor.execute(insert_query, (
        row['DT'].split('T')[0],
        row['UNIT_NAME'],
        row['MATERIAL'],
        row['YTD_PROD'],
        row['ONDT_PROD'],
        row['YTD_OFFTAKE'],
        row['ONDT_OFFTAKE']
    ))

conn.commit()
cursor.close()
conn.cl
