const express = require('express');
const Comments = require('../models/Comments');

const router = express.Router();

router.get('/', function(request, response) {

  // Returns an array, always
  Comments.find().lean().exec()
    .then(function(comments) {
      // response.setHeader('Content-Type', 'application/json');
      // response.end(JSON.stringify(names));
      response.json(comments);
    })
    .catch(function(err) {
      response.status(500).json(err)
    });

});

router.get('/:id', function(request, response) {
  const id = request.params.id;
  
  // Returns one or no documents
  Comments.findOne({ _id: id }).lean().exec()
    .then(function(comment) {
      response.json(comment);
    })
    .catch(function(err) {
      response.status(500).json(comment);
    })
});

router.post('/', function(request, response) {
  const name    = request.body.name;
  const comment = request.body.comment;

  Comments.create({ comment: comment, name: name })
    .then(function(comment) {
      response.json(comment);
    })
    .catch(function(err) {
      response.status(500).json(err);
    })
});

router.put('/:id', function(request, response) {
  const id = request.params.id;
  const comment = request.body.comment;

  Comments.findOneAndUpdate({ _id: id }, { comment: comment }, { new: true }).exec()
    .then(function(newComment) {
      response.json(newComment);
    })
    .catch(function(err) {
      response.status(500).json(err)
    })
});

router.delete('/:id', function(request, response) {
  const id = request.params.id;

  Comments.findOneAndRemove({ _id: id }).exec()
    .then(function() {
      response.end();
    })
    .catch(function(err) {
      response.status(500).json(err);
    })
});

module.exports = router;