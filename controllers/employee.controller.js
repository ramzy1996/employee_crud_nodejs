const express = require('express')
const router = express.Router()

const Employee = require('../models/employee.model')
const { generateCrudMethods } = require('../services')
const { validDbId, record404Error } = require('../middlewares')
const emp = generateCrudMethods(Employee)

router.get('/', (req, res, next) => {
    emp.getAll
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
    emp.create(req.body)
        .then(data => res.status(201).json(data))
        .catch(err => next(err))
})

router.put('/:id', validDbId, (req, res) => {
    emp.update(req.params.id, req.body)
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