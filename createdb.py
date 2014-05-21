__author__ = 'Nick'
from model import *

tables = [Users,UserSession]

for table in tables:
   if table.table_exists():
      table.drop_table()
   table.create_table()
