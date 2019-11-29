from ISS_track import findISS
import smtplib

print("Running")
#London
Latmax = 52.078635
Longmax = 0.542653
Latmin = 50.768049
Longmin = -0.946666

server = smtplib.SMTP('smtp.gmail.com', 587)
server.starttls()
smtp_server = "smtp.gmail.com"
sender_email = "isstracker2019@gmail.com"  # Enter your address
receiver_email = "olithompson1919@rocketmail.com"  # Enter receiver address
password = 'jsRfpcy9'
server.login(sender_email, password)

while True:
    data = findISS()
    if (Latmin < float(data['iss_position']['latitude']) < Latmax) and (Longmin < float(data['iss_position']['latitude']) < Longmax):
        message = "ISS directly overhead" 
        server.sendmail(sender_email, receiver_email, message)

