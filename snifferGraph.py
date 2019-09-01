import logging
import json
import requests

def get_kafka_cypher(source, topic):
    return '''
           MERGE (z: HOST {{ name: '{source}' }})
           with z
           MATCH (m: HOST {{ name: '{source}' }})
           MERGE (x: TOPIC {{ name: '{topic}' }})
           MERGE (m)-[r:PUB]->(x)
           ON CREATE SET r.count = 1
           ON MATCH SET r.count = r.count + 1
           RETURN id(z)
           '''.format(source=source,  topic=topic)


def get_http_cypher(source, destination, method):
    return '''
           MERGE (z: HOST {{ name: '{source}' }})
           with z
           MATCH (m: HOST {{ name: '{source}' }})
           MERGE (x: HOST {{ name: '{destination}' }})
           MERGE (m)-[r:REL]->(x)
           ON CREATE SET r.count = 1, r.name = '{method}'
           ON MATCH SET r.count = r.count + 1
           RETURN id(z)
           '''.format(source=source, destination=destination, method=method)


def push_topic(source, topic):
    cypher = " ".join(get_kafka_cypher(source, topic).splitlines())
    push(cypher)


def push_connection(source, destination, method):
    cypher = " ".join(get_http_cypher(source, destination, method).splitlines())
    push(cypher)

def push(cypher):
    try:
        logging.warn(cypher)
        requests.post('http://neo4j:7474/db/data/transaction/commit',
                      data=json.dumps({"statements": [{"statement": cypher}]}),
                      headers={"Content-Type": "application/json",
                               "Accept": "application/json; charset=UTF-8",
                               "Authorization": "Basic bmVvNGo6eWV0aQ=="})
    except Exception as e:
        logging.exception('graph commit failed {}'.format(e.message))
