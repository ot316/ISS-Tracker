from urllib.request import urlopen
from datetime import datetime
from time import sleep
import math
import json
import os

clear = "\n" * 10
MapWidth = 1200
MapHeight = 600

def findISS():
    response = urlopen("http://api.open-notify.org/iss-now.json")
    obj = json.loads(response.read())
    return(obj)

def mercatorconversion(Longitude, Latitude, MapWidth, MapHeight):
    x = (float(Longitude) + 180) * (MapWidth / 360)
    # convert from degrees to radians
    latRad = float(Latitude) * math.pi / 180
    # get y value
    mercN = math.log(math.tan((math.pi / 4) + (latRad / 2)))
    y = MapHeight- ((MapHeight / 2) - (MapWidth * mercN / (2 * math.pi)))
    return(x, y)

#test
if __name__ == "__main__":
    while True:
        #test with dummy map dimensions
        print(clear)  
        data = findISS()
        print("Date =", datetime.fromtimestamp(data['timestamp']))
        print("latitude =", data['iss_position']['latitude'])
        print("longitude =", data['iss_position']['longitude'])
        x, y = mercatorconversion(data['iss_position']['longitude'], data['iss_position']['latitude'], MapWidth, MapHeight)
        print("x = %0.2f" %x)
        print("y = %0.2f" %y)
        sleep(10)
      

      