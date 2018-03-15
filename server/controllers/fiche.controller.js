var config = require('config.json');
var express = require('express');
var router = express.Router();
var ficheService = require('services/fiche.service');

// routes
router.post('/create', create);
router.post('/getAll', getAll);
router.put('/ajoutFrais', ajoutFrais);

module.exports = router;

function create(req, res) {
  ficheService.create(req.body)
    .then(function(user) {
      console.log(user);
      res.sendStatus(200);
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
}

function ajoutFrais(req, res) {
  ficheService.ajoutFrais(req.body)
    .then(function() {
      res.sendStatus(200);
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
}

function getAll(req, res) {
  console.log(req._id);
  ficheService.getAll(req._id)
    .then(function(users) {
      res.send(users);
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
}
