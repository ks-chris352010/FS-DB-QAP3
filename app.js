const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes/API_Routes');
const { getAll, getEntryById, updateEntry, createEntry } = require('./src/dal/DataAccess');

const app = express();

// Middleware:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// Set EJS as the view engine:
app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');

// Mount API routes:
app.use('/', routes);

// Home page render:
app.get('/', async (req, res) => {
    try {
        const entries = await getAll();
        res.render('index', { entries });
    } catch (error) {
        console.error('Error fetching entries:', error);
        res.status(500).render('error');
    }
});

// Edit page render:
app.get('/edit/:id', async (req, res) => {
    try {
        const entryId = req.params.id;
        const entry = await getEntryById(entryId);
        res.render('edit', { entryId, entry });
    } catch (error) {
        console.error('Error fetching entry:', error);
        res.status(500).render('error');
    }
});

// Render add entry form:
app.get('/add', (req, res) => {
    res.render('add');
});

// Handle adding a new entry:
app.post('/add', async (req, res) => {
    try {
        const { name, number } = req.body;
        await createEntry(name, number);
        res.redirect('/');
    } catch (error) {
        console.error('Error adding entry:', error);
        res.status(500).render('error');
    }
});

app.post('/update/:id', async (req, res) => {
    try {
        const entryId = req.params.id;
        const { name, number } = req.body; 
        await updateEntry(entryId, name, number);
        res.redirect('/');
    } catch (error) {
        console.error('Error updating entry:', error);
        res.status(500).render('error');
    }
});

// Start the server:
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
