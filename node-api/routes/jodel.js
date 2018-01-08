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


/**
 * GET /api/jodels to get all jodels
 */
function getJodels(req, res) {
  var page = parseInt(req.query.page) || 1;
  var limit = parseInt(req.query.limit) || 10;

  // keep only filter field values
  var query = req.query;
  delete query.page;
  delete query.limit;

  Jodel.paginate(query, {page: page, limit: limit}, function(err, jodels) {
    if (err)
      res.send(err);

    res.json(jodels);
  });
}

module.exports = {postJodel, getJodels};