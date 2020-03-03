const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const { products } = require('./data/products.json');
require('./js/root');

const handlebars = require('express-handlebars').create({
    defaultLayout: 'main',
});

app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars.engine);
app.set('port', 6969);

//BODY PARSER SET-UP
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/products', (req, res) =>
    res.render('products', { products }));

app.get('/product', (req, res) => {
    const { id } = req.query;
    const product = products.find((item) => item.id == id);
    res.render('product', { product });
});

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

app.listen(app.get('port'), () => {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});