from urllib.request import urlopen
from datetime import datetime
import json

def findISS():
    response = urlopen("http://api.open-notify.org/iss-now.json")
    obj = json.loads(response.read())
    return(obj)

if __name__ == "__main__":
    data = findISS()
    print(datetime.fromtimestamp(data['timestamp']))
    print(data['iss_position']['latitude'], data['iss_position']['longitude'])