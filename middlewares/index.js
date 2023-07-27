const ObjectId = require('mongoose').Types.ObjectId

const validDbId = (req, res, next) => {
    if (ObjectId.isValid(req.params.id) == false) {
        res.status(400).json({
            error: `given objectid (${req.params.id}) is not valid.`
        })
    } else next()
}
const record404Error = (req, res) => {
    res.status(404).json({
        error: `no record with given id: ${req.params.id}`
    })
}

const errorHandler = (error, req, res, next) => {
    res.status(500).json({ error })
}

module.exports = {
    validDbId,
    record404Error,
    errorHandler
}