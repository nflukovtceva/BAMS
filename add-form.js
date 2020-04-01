const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require('path');

/*app.use(express.static('public'));

app.get('/add-form', function(req, res) {
	res.sendFile(path.join(__dirname + '/add-form.html'));
});*/
app.post('/add-form-results', function (req, res) {
const sql= require("mssql");

const config = {
	user: 'bsnc',
	password: 'W3passwd',
	server: 'localhost',
	database: '489_BAMS',
	port: 1433
};

let sqlConn = new sql.Request(config);

// sqlConn.connect().then(function () {
    // const transaction = new sql.Transaction(sqlConn);
    // transaction.begin().then(function () {
         

function addArtist(fname, lname, phone, email, address1, address2, state, city, zip, shareholder){
    pool.connect((err, client, done) => {
        if(err) throw err;

        const shouldAbort = (err) => {
            if (err) {
                console.error('Error in addArtist', err.stack);
                client.query('ROLLBACK', (err) => {
                    if (err) {
                        console.error('Error rolling back client', err.stack);
                    }
                    // release the client back to the pool
                    done();
                })
            }
            return !!err;
        };

        client.query('BEGIN', (err) => {
            if (shouldAbort(err)) return;

            const insertArtist = 'INSERT INTO Artist(fname, lname, phone, email, address1, address2, state, city, zip, shareholder) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
            const insertValues = [fname, lname, phone, email, address1, address2, state, city, zip, shareholder];
            client.query(insertArtist, insertValues, (err, res) => {
                if (shouldAbort(err)) return;

                client.query('COMMIT', (err) => {
                    if (err) {
                        console.error('Error committing transaction: insert artist', err.stack);
                    }
                    done();
                })
            })
        });
    });
}

function addArt(title, type, collection, media, status, purchase_price, value, acquireddt, available, description){
    pool.connect((err, client, done) => {
        if (err) throw err;

        const shouldAbort = (err) => {
            if (err) {
                console.error('Error in addPainting', err.stack);
                client.query('ROLLBACK', (err) => {
                    if (err) {
                        console.error('Error rolling back client', err.stack);
                    }
                    // release the client back to the pool
                    done();
                })
            }
            return !!err;
        };

        client.query('BEGIN', (err) => {
            if (shouldAbort(err)) return;

            const insertArt = 'INSERT INTO Art(title, type, collection, media, status, purchase_price, value, acquireddt, available, description) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
            const insertValues = [title, type, collection, media, status, purchase_price, value, acquireddt, available, description];
            client.query(insertArt, insertValues, (err, res) => {
                if (shouldAbort(err)) return;

                client.query('COMMIT', (err) => {
                    if (err) {
                        console.error('Error committing transaction: insert painting', err.stack);
                    }
                    done();
                })
            })
        });
    });
}

function addLocation(city, building, room, description){
    pool.connect((err, client, done) => {
        if (err) throw err;

        const shouldAbort = (err) => {
            if (err) {
                console.error('Error in addCustomer', err.stack);
                client.query('ROLLBACK', (err) => {
                    if (err) {
                        console.error('Error rolling back client', err.stack);
                    }
                    // release the client back to the pool
                    done();
                })
            }
            return !!err;
        };

        client.query('BEGIN', (err) => {
            if (shouldAbort(err)) return;

            const insertLocation = 'INSERT INTO Customer(city, building, room, description) VALUES($1, $2, $3, $4)';
            const insertValues = [city, building, room, description];
            client.query(insertLocation, insertValues, (err, res) => {
                if (shouldAbort(err)) return;

                client.query('COMMIT', (err) => {
                    if (err) {
                        console.error('Error committing transaction: insert painting', err.stack);
                    }
                    done();
                })
            })
        });
    });
}});

const server =app.listen(4000, function(){
	console.log('Running...');
})