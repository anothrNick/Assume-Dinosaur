from flask import Flask, render_template, session, redirect, url_for, request, g, flash
from flask_sockets import Sockets
from model import *
import json

app = Flask(__name__)
app.secret_key = 'lak12sdf978&%asn2_0+lkasn2jgie'
app.config["DEBUG"] = True
sockets = Sockets(app)

class ClientManager():
    def __init__(self):
        self.clients = []
        self.ids = 1000

    def broadcast(self, msg, ignore=[]):
        for c in self.clients:
            if c not in ignore:
                try:
                    c.send(msg)
                except Exception as e:
                    self.clients.remove(c)
   
    def addClient(self, client):
        if client not in self.clients:
            self.clients.append(client)
            response = "{\"cmd\":\"response\",\"data\":\"pong\", \"id\":\"%s\", \"username\":\"%s\"}" % (self.ids, 'username')
            self.ids += 1
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
        elif message["cmd"] == "chat":
            clients.broadcast(json.dumps(message), ignore=[])
        else:#remove client
            clients.broadcast(json.dumps(message), ignore=[ws])
        #     session.pop("username", None)

@app.route('/')
def index():
    if 'username' in session:
        return render_template("ad.html")
    else:
        return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        useCnt = Users.select().where(request.form['username'] == Users.username,
                                request.form['password'] == Users.password).count()

        if useCnt:
            use = Users.select().where(request.form['username'] == Users.username,
                                request.form['password'] == Users.password).count()
            session['username'] = use.username
            session['userid'] = use.id

            return redirect(url_for('index'))
        else:
            flash("username or password is incorrect")

    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        user = Users.create(username=request.form['username'],
                            email=request.form['email'],
                            password=request.form['password'],
                            date_joined=datetime.datetime.now())
        if user:
            session['username'] = user.username
            session['userid'] = user.id

            return redirect(url_for('index'))

    return render_template('register.html')

#auto open close db connections
@app.before_request
def before_request():
    g.db = db
    g.db.connect()

@app.after_request
def after_request(response):
    g.db.close()
    return response

