const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date');

const app = express();

let items = [];
let workItems = [];

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    // borrado
    let day = date.getDay();

    res.render('list', { listTitle: day, newListItems: items });
});

app.post('/', (req, res) => {
    let item = req.body.newItem;

    console.log(req.body);

    if (req.body.list === 'Work list') {
        workItems.push(item);
        res.redirect('/work');
    } else {
        items.push(item);
        res.redirect('/');
    }
});

app.get('/work', (req, res) => {
    res.render('list', { listTitle: 'Work list', newListItems: workItems });
});

app.get('/about', (req, res) => {
    res.render('about', { listTitle: 'About' });
});

app.listen(3000, () => {
    console.log('The server is running on port 3000');
});
