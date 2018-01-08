let Jodel = require('../app/models/jodel');

/**
 * POST /api/jodels to create new jodel
 */
function postJodel(req, res) {
  var jodel = new Jodel();    // create a new instance of the Jodel model
  jodel.name = req.body.name;  // set the jodels name (comes from the request)
  jodel.score = req.body.score;  // set the jodels score (comes from the request)

  jodel.save(function(err) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json({message: 'Jodel created!'});
    }
  });
}

module.exports = {postJodel};