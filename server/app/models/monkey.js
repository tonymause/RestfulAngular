
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MonkeySchema = new Schema({
  name: String
});

module.exports = mongoose.model('Monkey', MonkeySchema);
