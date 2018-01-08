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

/**
 * GET /api/jodels/:jodel_id to get a jodel by id
 */
function getJodel(req, res) {
  Jodel.findById(req.params.jodel_id, function(err, jodel) {
    if (err)
      res.send(err);
    res.json(jodel);
  });
}

/**
 * PUT /api/jodels/:jodel_id to update a jodel by id
 */
function putJodel(req, res) {
  Jodel.findById(req.params.jodel_id, function(err, jodel) {
    if (err)
      res.send(err);

    jodel.name = req.body.name;
    jodel.score = req.body.score;
    jodel.save(function(err) {
      if (err)
        res.send(err);

      res.json({message: 'Jodel updated!'});
    });
  });
}

/**
 * DELETE /api/jodels/:jodel_id to delete a jodel by id
 */
function deleteJodel(req, res) {
  Jodel.remove({
    _id: req.params.jodel_id
  }, function(err, jodel) {
    if (err)
      res.send(err);

    res.json({message: 'Successfully deleted'});
  });
}

module.exports = {postJodel, getJodels, getJodel, putJodel, deleteJodel};