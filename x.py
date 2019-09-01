import logging
import requests
import json
from requests.auth import HTTPBasicAuth

def g():
    r = requests.post('http://neo4j:7474/db/data/transaction/commit',
        data=json.dumps({"statements":[{"statement": "CREATE (n:WORKS {name: \"fdfgfg\"}) RETURN id(n)"}]}),
        headers={
                  "Content-Type": "application/json",
                  "Accept": "application/json; charset=UTF-8",
                 "Authorization": "Basic bmVvNGo6eWV0aQ=="})
    print '\n {}'.format(r)

g()
