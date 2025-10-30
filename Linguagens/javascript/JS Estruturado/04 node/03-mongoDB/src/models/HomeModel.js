

const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
    titulo: {type: String, require: true},
    descricao: String
});

const homeModel = mongoose.model('home', HomeSchema);

module.exports = homeModel