const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const superAgent = require('superagent');

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
    process.env.host !== host && getMinDistance(hosts, host, process.env.host) > 2 && superAgent.get(`http://${host}/`).end(()=>{
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
