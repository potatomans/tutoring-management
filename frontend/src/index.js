import ReactDOM from 'react-dom/client';

//
import App from './App';
import * as serviceWorker from './serviceWorker';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);

/*

function createDbConnection() {
    const db = new sqlite3.Database(filepath, (error) => {
        if (error) {
            return console.error(error.message)
        }
    })
    createTutor(db)
    var userInsert = 'INSERT INTO createTutor (name, email. phone, endDate) VALUES (?, ?, ?, ?)'
    db.run(userInsert, ['i am john', '123@gmail.com', '999', '1/1/2023'])
}

function createTutor(db) {
    db.run(`CREATE TABLE User (
        name TEXT,
        email TEXT,
        phone INT,
        endDate TEXT)`)
}

*/

// If you want to enable client cache, register instead.
serviceWorker.unregister();

