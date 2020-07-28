const mongoose = require('mongoose');
const players = require('./Player');

const TeamSchema = new mongoose.Schema({
    id: {
        type: Number,
        seq: { type: Number, default: 0 }
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: { type : Date, default: Date.now },
    players: [players.PlayerSchema]
});

const Team = mongoose.model("Team", TeamSchema);
module.exports = Team