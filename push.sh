tcpflow -p -c -i eth0  | \
stdbuf -o0 grep -oE 'Host: .*' | \
cat  | \
stdbuf -o0 sed 's/Host://' | \
while read line; do echo "${line::-1}"; \
  json="{\"statements\":[{\"statement\":\"MERGE (z:HOST {name: '$(echo "${host}")'}) MERGE (x:HOST {name: '$(echo "${line::-1}")' }) MERGE (z)-[l:REQ]->(x) ON CREATE SET l.count = 1 ON MATCH SET l.count = l.count + 1   RETURN id(x)\"}]}"; \ 
  [[ "${line::-1}" != "neo4j:7474" ]] && curl -X POST -H "Accept: application/json; charset=UTF-8" -H "Authorization: Basic bmVvNGo6eWV0aQ==" -H "Content-Type: application/json" -d "$json" http://neo4j:7474/db/data/transaction/commit \
 ; \ 
done