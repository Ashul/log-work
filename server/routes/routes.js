const user = require('./user-routes');
const ticket = require('./ticket-routes');
module.exports = function(app){
    app.use('/api/users', user)
    app.use('/api/ticket', ticket)
}