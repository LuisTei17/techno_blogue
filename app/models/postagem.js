var mongoose = require('mongoose');

var Schema = mongoose.Schema;

module.exports = function() {
    var PostSchema = Schema({
        titulo: String,
        texto: String,
        autor: String,
        data: {type: Date, default: Date.now}
    });

    return mongoose.model('Posts', PostSchema);
}