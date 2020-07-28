const express = require('express');
const PlayerModel = require('../models/Player').PlayerModel;
const teamModel = require('../models/Team');
const app = express();

app.get('/players/:id', async (req, res) => {
    try {
        const team = await teamModel.findOne({ "players._id": req.params.id } );
        if (!team) res.status(404).send("No item found")
        res.send(team.players.id(req.params.id));
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/players/:id', async (req, res) => {
    try {
        const team = await teamModel.findById(req.params.id);
        if (!team) res.status(404).send("No se encontro ese equipo")
        else {
            const player = new PlayerModel(req.body);
            await player.save();
            team.players.push(player);
            await team.save()
            res.send(player);
        }
    } catch (err) {
        res.status(500).send({ error: err.errmsg });
    }
});

app.delete('/players/:id', async (req, res) => {
    try {
        const team = await teamModel.findOne({ "players._id": req.params.id } )
        await PlayerModel.findByIdAndDelete(req.params.id)
        team.players.id(req.params.id).remove();
        team.save()
        res.status(200).send(team);
    } catch (err) {
        res.status(500).send(err)
    }
})


app.put('/players/:id', async (req, res) => {
    try {
        const team = await teamModel.findOne({ "players._id": req.params.id } );
        let player = team.players.id(req.params.id);
        player.email =  req.body.email;
        player.name =  req.body.name;

        await team.save();
        res.send(team)
    } catch (err) {
        res.status(500).send(err)
    }
})
module.exports = app
