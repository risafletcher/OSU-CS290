const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('./dbcon.js');

const port = process.env.PORT || 6969;
const handlebars = require('express-handlebars').create({
    defaultLayout: 'main',
});

app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars.engine);

//BODY PARSER SET-UP
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));


// RESET
app.get('/reset-table', function (req, res, next) {
    mysql.pool.query("DROP TABLE IF EXISTS tracker", function (err) { //replace your connection pool with the your variable containing the connection pool
        var createString = "CREATE TABLE tracker(" +
            "id INT PRIMARY KEY AUTO_INCREMENT," +
            "name VARCHAR(255) NOT NULL," +
            "reps INT," +
            "weight INT," +
            "date DATE," +
            "unit VARCHAR(255))";
        mysql.pool.query(createString, function (err) {
            res.render('home');
        })
    });
});

// GET
app.get('/', (req, res, next) => {
    mysql.pool.query(
        `CREATE TABLE IF NOT EXISTS tracker(
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        reps INT,
        weight INT,
        date DATE,
        unit VARCHAR(255))`,
        (err) => {
            mysql.pool.query('SELECT * FROM tracker', (err, rows) => {
                if (err) {
                    next(err);
                    return;
                }
                res.render('home', {
                    results: rows
                })
            })
        }
    );
});

app.post('/', ({
    body: {
        id,
        name,
        reps,
        weight,
        date,
        unit
    }
}, res, next) => {
    if (id) {   // UPDATE
        mysql.pool.query(
            'SELECT * FROM tracker WHERE id=?',
            [id],
            (err, result) => {
                if (err) {
                    next(err);
                    return;
                }
                if (result.length) {
                    const {
                        name: currentName,
                        reps: currentReps,
                        weight: currentWeight,
                        date: currentDate,
                        unit: currentUnit
                    } = result[0];
                    mysql.pool.query(
                        'UPDATE tracker SET name = ?, reps = ?, weight = ?, date = ?, unit = ? WHERE id = ?',
                        [
                            name || currentName,
                            reps || currentReps,
                            weight || currentWeight,
                            date || currentDate,
                            unit || currentUnit,
                            id
                        ],
                        (err, result) => {
                            if (err) {
                                next(err);
                                return;
                            }
                            res.redirect('back');
                        }
                    );
                }
            })
    } else {    // INSERT
        mysql.pool.query(
            'INSERT INTO tracker (`name`, `reps`, `weight`, `date`, `unit`) VALUES (?, ?, ?, ?, ?)',
            [name, reps, weight, date, unit],
            (err, results) => {
                if (err) {
                    next(err);
                    return;
                }
                res.redirect('back');
            }
        )
    }
});

// DELETE
app.delete('/', ({ body: { id } }, res, next) => {
    mysql.pool.query(
        'DELETE FROM tracker WHERE id = ?',
        [id],
        (err, result) => {
            if (err) {
                next(err);
                return;
            }
            res.end();
        }
    )
})

app.use((req, res) => {
    res.status(404);
    res.render('404');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.listen(port, () => {
    console.log('Express started on ' + port + '; press Ctrl-C to terminate.');
});