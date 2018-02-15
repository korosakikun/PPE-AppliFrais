var config = require('config.json');
var express = require('express');
var router = express.Router();
var ficheService = require('services/fiche.service');

// routes
router.post('/create', create);
// router.delete('/:_id', _delete);
router.put('/ajoutFrais', ajoutFrais);
// router.put('/:_id', update);

module.exports = router;

function create(req, res) {
  console.log('create')
    ficheService.create(req.body)
        .then(function (user) {
          console.log(user);
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function ajoutFrais(req, res) {
    ficheService.ajoutFrais(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAll(req, res) {
    ficheService.getAll()
        .then(function (users) {
            res.send(users);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getCurrent(req, res) {
    ficheService.getById(req.user.sub)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    ficheService.update(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    ficheService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
