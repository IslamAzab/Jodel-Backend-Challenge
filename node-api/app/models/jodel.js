var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var JodelSchema   = new Schema({
  name: String,
  score: Number
});

module.exports = mongoose.model('Jodel', JodelSchema);