import dotenv from 'dotenv';
import pgp from 'pg-promise';

dotenv.config();

const initOptions = {
    // Misalnya, event untuk memantau query atau error
    // query: (e) => {
    //     console.log('QUERY:', e.query);
    // },
    // error: (err, e) => {
    //     console.log('ERROR:', err, e.query);
    // }
};

const pgpInstance = pgp(initOptions); // <-- Panggil pgp() hanya satu kali di sini


const configDb = {
    port: process.env.DB_PORT,
    host:  process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
}


const db = pgpInstance(configDb);
export default db

db.connect()
	.then(obj => {
		console.log('Connected to Primary Database!');
		obj.done(); // Klien dikembalikan ke pool
	})
	.catch(error => {
		console.error("\n\x1b[31mError!\x1b[0m\ncannot connect to Database:", error.message || error, "\n");
		process.exit(1);
	});
