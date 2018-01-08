var mongoose     = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema       = mongoose.Schema;

var JodelSchema   = new Schema({
  name: {type: String, required: true},
  score: {type: Number, required: true}
});

JodelSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Jodel', JodelSchema);