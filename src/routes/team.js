const express = require('express');
const teamModel = require('../models/Team');
const app = express();

app.get('/teams', async (req, res) => {
    const teams = await teamModel.find({});

    try {
        res.send(teams);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/teams/:id', async (req, res) => {
    try {
        const team = await teamModel.findById(req.params.id)
        if (!team) res.status(404).send("No item found")
        res.send(team);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/teams', async (req, res) => {
    const team = new teamModel(req.body);

    try {
        await team.save();
        res.send(team);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.delete('/teams/:id', async (req, res) => {
    try {
        const team = await teamModel.findByIdAndDelete(req.params.id)
        if (!team) res.status(404).send("No item found")
        else res.status(200).send()
    } catch (err) {
        res.status(500).send(err)
    }
})


app.patch('/team/:id', async (req, res) => {
    try {
        await teamModel.findByIdAndUpdate(req.params.id, req.body)
        await teamModel.save()
        res.send(team)
    } catch (err) {
        res.status(500).send(err)
    }
})
module.exports = app
