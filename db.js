const mongooe = require('mongoose')
const dbUri = 'mongodb+srv://admin:1234@cluster0.8sjdnf5.mongodb.net/employee_db?retryWrites=true&w=majority'
module.exports = () => {
    return mongooe.connect(dbUri)
}