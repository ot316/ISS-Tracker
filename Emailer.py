from ISS_track import findISS
import smtplib
from time import sleep

print("Running")
#London
Latmax = 55.078635
Longmax = 3.542653
Latmin = 47.768049
Longmin = -3.946666

server = smtplib.SMTP('smtp.gmail.com', 587)
server.starttls()
smtp_server = "smtp.gmail.com"
sender_email = "isstracker2019@gmail.com"  # Enter your address
receiver_email = "olithompson1919@gmail.com"  # Enter receiver address
password = ''
server.login(sender_email, password)
message = """\
Subject: ISS Tracker

Tracker turned on"""
server.sendmail(sender_email, receiver_email, message)

while True:
    data = findISS()
    sleep(0.5)
    if (Latmin < float(data['iss_position']['latitude']) < Latmax) and (Longmin < float(data['iss_position']['latitude']) < Longmax):
        message = """\
        Subject: ISS Tracker

        ISS overhead"""
        server.sendmail(sender_email, receiver_email, message)
        sleep(20)

