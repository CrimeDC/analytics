import csv
from urllib2 import urlopen
import requests
import json
import time
f1 = open('geos.txt', 'r+')
with open('crime_incidents_2013_CSV.csv', 'rb') as f:
    reader = csv.reader(f)
    for row in reader:
    	offense = row[3]
    	method = row[4]
        address = row[6]
        report_date = row[1]
        r = requests.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + address + " washington dc")
        resp = json.loads(r.text)
        coord = resp['results'][0]['geometry']['location']
        print coord
        formatted_address = resp['results'][0]['formatted_address']
        lat = coord['lat']
        lng = coord['lng']
        arr = []
        arr.append(lat)
        arr.append(lng)
       	arr.append(offense)
       	arr.append(method)
       	arr.append(address)
       	arr.append(report_date)
        if method != "OTHERS":
        	arr.append(offense + " : " + method)
        else:
        	arr.append(offense)
        arr.append(address + "\n" + report_date)
        print arr
        f1.write(str(arr) + ',\n')
        time.sleep(.02)
#wr2 = csv.writer(open("round4.csv", "wb"))
