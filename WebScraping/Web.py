import requests

from bs4 import BeautifulSoup
import csv

URL = "http://bookstoscrape.com"
response = requests.get(URL)
print(response.status_code) # 200 = successful request
print(response.text) # html code of the page you are requesting

if response.status_code == 200:
    print("Status code exitoso.") # 200 = successful request
    print(response.text[:15]) # html code of the page you are requesting
else:
    print("Response status code:", response.status_code) # 200 = successful request 

URL_ficcion = "http://bookstoscrape.com/libro_ficcion"
response = requests.get(URL_ficcion)
print(response.status_code)