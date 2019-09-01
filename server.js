const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const superAgent = require('superagent');
const kafka = require('kafka-node');
const { Client: PgClient } = require('pg');
const type = require('./type');


const kafkaClientOptions = { sessionTimeout: 100, spinDelay: 100, retries: 2 };
const kafkaClient = new kafka.Client(process.env.KAFKA_ZOOKEEPER_CONNECT, 'producer-client', kafkaClientOptions);
const kafkaProducer = new kafka.HighLevelProducer(kafkaClient);

kafkaClient.on('error', (error) => console.error('Kafka client error:', error));
kafkaProducer.on('error', (error) => console.error('Kafka producer error:', error));

const messageBuffer = type.toBuffer({
  name: "yyr-rere-errer-erer",
  date: Date.now()
});

const payload = [{
  topic: 'TopicX',
  messages: messageBuffer,
  attributes: 1
}];

setInterval(()=> {
['a', 'e', 'f'].includes(process.env.host) &&  kafkaProducer.send(payload, function(error, result) {
  console.info('Sent payload to Kafka:', payload);

  if (error) {
    console.error('Sending payload failed:', error);

  } else {
    console.log('Sending payload result:', result);

  }
});
}, 10000);

const config = {
    name: 'sample-express-app',
    port: 80,
    host: '0.0.0.0',
};

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send('hello world');
});

app.listen(config.port, config.host, (e)=> {
    if(e) {
        throw new Error('Internal Server Error');
    }

});

const hosts = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

setInterval(()=> {
    const host = hosts[getRandomInt(10)];
    process.env.host !== host && superAgent.get(`http://${host}/`).end(()=>{
        console.log(` ${host} called...`);
    });
} , 5000);

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

const getMinDistance = (array, left, right) => {
    var rightIndex, leftIndex, minDistance;
    array.forEach(function (a, i) {
        if (a === left && (leftIndex === undefined || leftIndex < i)) {
            leftIndex = i;
        }
        if (a === right && leftIndex !== undefined) {
            rightIndex = i;
        }
        if (leftIndex < rightIndex && (minDistance === undefined || minDistance > rightIndex - leftIndex)) {
            minDistance = rightIndex - leftIndex;
        }
    });
    return minDistance
}
