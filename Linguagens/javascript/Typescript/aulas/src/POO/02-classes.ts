// Continuação sobre classes

/*
    Crio o objeto database 1 vez, e apos isso ele sempre vai retornar este mesmo objeto, evitando dezenas de conexão desncessarias
*/

// Visando padrão de projeto singleton
class Database {
    private static database: Database;
    // Construtor privado
    private constructor(
        private host: string, 
        private user: string, 
        private password:string
    ){}

    static getDatabase(host: string, user: string, password: string): Database {
        if(Database.database) return Database.database;
        Database.database = new Database(host, user, password);
        return Database.database;
    }

    connect(): void {
        console.log(`Conectado: ${this.host}, ${this.user}, ${this.password}`)
    }
}

const db1 = Database.getDatabase('localhost', 'root', '123456')
db1.connect();

const db2 = Database.getDatabase('localhost', 'root', '123456')
db2.connect();

export{};