<<<<<<< HEAD
/*
    Estrutura try, catch, throw, finally
 */

function soma(x, y) {
    if (typeof x !== 'number' || typeof y !== 'number') throw new TypeError ('Somente numeros');
    return x + y;
}

try {
    console.log(`tenta fazer a ação que pode retornar erro`);
} catch (e) {
    console.log(`tratando erro`);
} finally {
    console.log(`Sempre executa`);
}

=======
/*
    Estrutura try, catch, throw, finally
 */

function soma(x, y) {
    if (typeof x !== 'number' || typeof y !== 'number') throw new TypeError ('Somente numeros');
    return x + y;
}

try {
    console.log(`tenta fazer a ação que pode retornar erro`);
} catch (e) {
    console.log(`tratando erro`);
} finally {
    console.log(`Sempre executa`);
}

>>>>>>> origin/master
