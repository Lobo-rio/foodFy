const { Pool } = require('pg')

module.exports = new Pool({
    user: '',
    password: '',
    host: '',
    port: 5432,
    database: ''
})