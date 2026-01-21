<<<<<<< Updated upstream
const mysql = require(`mysql2`);

const conexao = mysql.createConnection({
    host: `localhost`,
    user: `root`,
    password: `Ricardo04@`,
    database: `aula`
})

conexao.connect((err)=> {
    if(err)throw err
    console.log(`Conectado ao Mysql`)
})

=======
const mysql = require(`mysql2`);

const conexao = mysql.createConnection({
    host: `localhost`,
    user: `root`,
    password: `xt387wX0UfHO5mj6uh0h`,
    database: `gestao`
})

conexao.connect((err)=> {
    if(err)throw err
    console.log(`Conectado ao Mysql`)
})

>>>>>>> Stashed changes
module.exports = conexao