const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) => {
    const event = req.body;
    console.log('New post detected. Events emitted');

    console.log('[EVENTS-BUS] emitting to Posts service');
    axios.post('http://localhost:4000/events', event);

    console.log('[EVENTS-BUS] emitting to Comments service');
    axios.post('http://localhost:4001/events', event);

    console.log('[EVENTS-BUS] emitting to Query service');
    axios.post('http://localhost:4002/events', event);

    console.log('[EVENTS-BUS] emitting to the Moderation service');
    axios.post('http://localhost:4003/events', event);

    res.send({ status: 'OK' });
});

app.listen(4005, () => {
    console.log('Events bus listening on 4005');
});