var mongoose     = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema       = mongoose.Schema;

var JodelSchema   = new Schema({
  name: String,
  score: Number
});

JodelSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Jodel', JodelSchema);