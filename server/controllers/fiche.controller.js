var config = require('config.json');
var express = require('express');
var router = express.Router();
var ficheService = require('services/fiche.service');

// liste des routes du controlleur fiche, ces routes sont appelée du coté client et renvoi vers une fonction
router.post('/create', create);
router.post('/getAll', getAll);
router.post('/getAllNonTraite', getAllNonTraite);
router.post('/getAllForUser', getAllForUser);
router.put('/ajoutFrais', ajoutFrais);
router.put('/ficheEtat/:_id/', changeStateFiches);
router.put('/horsForfait/:_id/:_idFrai', changeStateFraisHorsForfait);
router.put('/:_id/:_idFrai', changeStateFrais);
router.put('/ajoutFraisHorsForfait', ajoutFraisHorsForfait);
router.delete('/:_id/:_idFrai', _delete);
router.delete('/horsForfait/:_id/:_idFrai', _deleteHorsForfait);

module.exports = router;

function create(req, res) {
  ficheService.create(req.body.user._id)
    .then(function(user) {
      res.sendStatus(200);
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
}

function changeStateFrais(req, res) {
  // on récupére dans la route les paramettre id et idFrai
  ficheService.changeStateFrais(req.params._id, req.params._idFrai, req.body.etat)
    .then(function() {
      res.sendStatus(200);
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
}

function changeStateFiches(req, res) {
  // on récupére dans la route les paramettre id et idFrai
  console.log('ici')
  ficheService.changeStateFiches(req.params._id, req.body.etat)
    .then(function() {
      res.sendStatus(200);
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
}

function changeStateFraisHorsForfait(req, res) {
  // on récupére dans la route les paramettre id et idFrai
  ficheService.changeStateFraisHorsForfait(req.params._id, req.params._idFrai, req.body.etat)
    .then(function() {
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

function ajoutFraisHorsForfait(req, res) {
  ficheService.ajoutFraisHorsForfait(req.body)
    .then(function() {
      res.sendStatus(200);
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
}

function getAllForUser(req, res) {
  ficheService.getAllForUser(req.body._id)
    .then(function(users) {
      res.send(users);
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
}

function getAll(req, res) {
  ficheService.getAll()
    .then(function(users) {
      res.send(users);
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
}

function getAllNonTraite(req, res) {
  ficheService.getAllNonTraite()
    .then(function(ficheNonTraite) {
      res.send(ficheNonTraite);
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
}

function _delete(req, res) {
  ficheService.delete(req.params._id, req.params._idFrai)
    .then(function() {
      res.sendStatus(200);
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
}

function _deleteHorsForfait(req, res) {
  ficheService.deleteHorsForfait(req.params._id, req.params._idFrai)
    .then(function() {
      res.sendStatus(200);
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
}
