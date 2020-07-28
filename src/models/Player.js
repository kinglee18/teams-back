const mongoose = require('mongoose');
const Team = require('./Team');

const PlayerSchema = new mongoose.Schema({
    id: {
        type: Number,
        seq: { type: Number, default: 0 }
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: { type : Date, default: Date.now }
});
PlayerSchema.pre('delete', function(next) {
    Team.remove({players: this._id}).exec();
    console.log(9999999999999999999999999999999999);
    
    next();
});
const PlayerModel = mongoose.model("Player", PlayerSchema);
module.exports = {PlayerSchema, PlayerModel}