const knex = require('../db/db');

knex('user').then(data => {
    console.log(data);
})
.catch(e => {})
.finally(() => {knex.destroy();}) // Destroi a conexão