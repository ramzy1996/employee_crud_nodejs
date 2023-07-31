const express = require('express')
const router = express.Router()

const Employee = require('../models/employee.model')
const { generateCrudMethods } = require('../services')
const emp = generateCrudMethods(Employee)
const { validDbId, record404Error } = require('../middlewares');

router.get('/', (req, res, next) => {
    emp.getAll()
        .then(data => res.send(data))
        .catch(err => next(err))
})

router.get('/:id', validDbId, (req, res, next) => {
    emp.getById(req.params.id)
        .then(data => {
            if (data) {
                res.send(data)
            } else record404Error(req, res)
        })
        .catch(err => next(err))
})

router.post('/', (req, res, next) => {
    const newRecord = {
        fullName: req.body.fullName,
        position: req.body.position,
        location: req.body.location,
        salary: req.body.salary,
    }
    emp.create(newRecord)
        .then(data => res.status(201).json(data))
        .catch(err => next(err))
})

router.put('/:id', validDbId, (req, res) => {
    const updatedRecord = {
        fullName: req.body.fullName,
        position: req.body.position,
        location: req.body.location,
        salary: req.body.salary,
    }
    emp.update(req.params.id, updatedRecord)
        .then(data => {
            if (data) {
                res.send(data)
            } else record404Error(req, res)
        })
        .catch(err => next(err))
})
router.delete('/:id', validDbId, (req, res) => {
    emp.delete(req.params.id)
        .then(data => {
            if (data) {
                res.send(data)
            } else record404Error(req, res)
        })
        .catch(err => next(err))
})

module.exports = router