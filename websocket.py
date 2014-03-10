from flask import Flask, render_template
from flask_sockets import Sockets
import json

app = Flask(__name__)
app.config["DEBUG"] = True
sockets = Sockets(app)

class ClientManager():
   def __init__(self):
      self.clients = []

   def broadcast(self, msg, ignore=[]):
      for c in self.clients:
         if c not in ignore:
            try:
               c.send(msg)
            except Exception as e:
               print e
               self.clients.remove(c)
   
   def addClient(self, client):
      if client not in self.clients:
         self.clients.append(client)
         response = "{\"cmd\":\"response\",\"data\":\"pong\", \"id\":\"%s\"}" % len(self.clients)
         client.send(response) 

clients = ClientManager()

@sockets.route("/echo")
def echo(ws):
   while True:
      message = ws.receive()
      if not message: 
         return
      
      clients.addClient(ws)
      message = json.loads(message)
      if message["cmd"] == "update":
         clients.broadcast(json.dumps(message), ignore=[ws])

@app.route('/')
def index():
   return render_template("index.html")
