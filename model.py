from peewee import *
import datetime

db = PostgresqlDatabase('dinodb', user='dino', password='dino', host='localhost')

class pgModel(Model):
   class Meta:
      database = db

class UserSession(pgModel):
   id = PrimaryKeyField()
   userid = IntegerField(default=0)
   xcoord = DoubleField(default=0.00)
   ycoord = DoubleField(default=0.00)
