/*
    knex('users').insert(data) - sintaxe basica
    knex.raw(query) - serve para inserir dado crus no banco de dados
*/

const knex = require('../db/db');

const data =[ {
    fist_name: 'André',
    last_name: 'Ricardo',
    email: 'andre@gmail.com',
    password_hash: '3_hash',
    salary: '12335.22'
},
    {
    fist_name: 'Pedro',
    last_name: 'Monteiro',
    email: 'pedro@gmail.com',
    password_hash: '4_hash',
    salary: '1895.22'
},
{
    fist_name: 'Helena',
    last_name: 'Rocha',
    email: 'helena@gmail.com',
    password_hash: '5_hash',
    salary: '20035.22'
}
]

// Insert basico na table users
const insert = knex('users').insert(data)
.then((data) => {
    console.log(data);
    console.log('')
    console.log(insert.toSQL().toNative()); 
})
.catch(e => console.log(e))
.finally(() => knex.destroy())



/*
 - Forma nativa que knex manda os dados, utilizando placeholders para evitar sql injection
{
  sql: 'insert into `users` (`email`, `fist_name`, `last_name`, `password_hash`) values (?, ?, ?, ?)',
  bindings: [ 'andre@gmail.com', 'André', 'Ricardo', '3_hash' ]
}
*/