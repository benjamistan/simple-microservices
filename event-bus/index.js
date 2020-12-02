const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
    const event = req.body;
    console.log('New post detected. Events emitted');

    events.push(event);

    console.log('[EVENTS-BUS] emitting to Posts service');
    axios.post('http://posts-clusterip-srv:4000/events', event);

    console.log('[EVENTS-BUS] emitting to Comments service');
    axios.post('http://comments-srv:4001/events', event);

    console.log('[EVENTS-BUS] emitting to Query service');
    axios.post('http://query-srv:4002/events', event);

    console.log('[EVENTS-BUS] emitting to the Moderation service');
    axios.post('http://moderation-srv:4003/events', event);

    res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
    res.send(events);
});

app.listen(4005, () => {
    console.log('Events bus listening on 4005');
});