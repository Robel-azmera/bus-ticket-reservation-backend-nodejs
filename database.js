const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "postgres",
    database: "Bus Ticket Reservation",
    host: "localhost",
    port: 5432
});

//5432
module.exports = pool;


