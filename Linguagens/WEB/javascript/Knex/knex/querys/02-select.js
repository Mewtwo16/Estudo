const knex = require('../db/db');

const select = knex('users').select('*') //Ao lugar do asteristico colocar a coluna especifica
    .then((data) => {
        console.log('========================')
        console.log('Select simples');
        console.log(data);
        console.log('========================')
    })
    .catch(e => console.log(e))
    .finally(() => knex.destroy())

// Com alias
const selectAlias = knex('users').select('email as uemail', 'id as udi') // * as alias
    .then((data) => {
        console.log('========================')
        console.log('Select com Alias');
        console.log(data);
        console.log('========================')
    })
    .catch(e => console.log(e))
    .finally(() => knex.destroy())

// Com Where
const selectWhere = knex('users').select('id', 'fist_name').where('id', '=', 2).orWhere('id', "=", 1)
    .then((data) => {
        console.log('========================')
        console.log('Select com where');
        console.log(data);
        console.log('========================')
    })
    .catch(e => console.log(e))
    .finally(() => knex.destroy())

// Com between

const selectBetween = knex('users').select('*').whereBetween('id', [2, 3])
    .then((data) => {
        console.log('========================')
        console.log('Select com between');
        console.log(data);
        console.log('========================')
    })
    .catch(e => console.log(e))
    .finally(() => knex.destroy())

// Com in

const selectIn = knex('users').select('*').whereIn('id', [1, 3])
    .then((data) => {
        console.log('========================')
        console.log('Select com in');
        console.log(data);
        console.log('========================')
    })
    .catch(e => console.log(e))
    .finally(() => knex.destroy())

// Com Like

const selectLike = knex('users').select('*').where('fist_name', 'like', '_n_r_')
    .then((data) => {
        console.log('========================')
        console.log('Select com like');
        console.log(data);
        console.log('========================')
    })
    .catch(e => console.log(e))
    .finally(() => knex.destroy())

// Com orderBy

const selectOrderby = knex('users').select('*').orderBy('id', 'desc')
    .then((data) => {
        console.log('========================')
        console.log('Select com orderBy');
        console.log(data);
        console.log('========================')
    })
    .catch(e => console.log(e))
    .finally(() => knex.destroy())

// Com limit(limita a quantidade) e offset(define apatir de quantos index) 

const selectLimit = knex('users').select('*').limit(2).offset(1)
    .then((data) => {
        console.log('========================')
        console.log('Select com orderBy');
        console.log(data);
        console.log('========================')
    })
    .catch(e => console.log(e))
    .finally(() => knex.destroy())

    
