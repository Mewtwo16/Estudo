
// Model do Mongo para a home (schema simples)
const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
    // `titulo` é obrigatório — `require: true` garante validação pelo Mongoose
    titulo: {type: String, require: true},
    descricao: String // campo opcional
});

// Nome do modelo: 'home' -> coleção ficará em minúsculas e pluralizada pelo Mongoose
const homeModel = mongoose.model('home', HomeSchema);

module.exports = homeModel