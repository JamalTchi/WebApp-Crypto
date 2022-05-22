const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'database',
    port: 3306
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.post('/', (req, res) => {
    const { email, password } = req.body;
    db.query(`Select * from users where email = '${email}' AND password = '${password}'`, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (result.length > 0) {
                res.status(200).send(result);
            } else {
            res.status(400).send('user not found');
            }
        }
    });
})

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    db.query(`INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${password}')`, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    }); 
})

app.listen(3001, () => {
    console.log('Server is running on port 3001');
    db.connect((err) => {
        if (err) throw err;
        console.log('Connected to database');
    });
});