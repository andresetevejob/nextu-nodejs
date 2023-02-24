const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost:27017/appadmin?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
const Categories = require('./models/categories');
const Articles = require('./models/articles');
const app = express();
app.use(bodyParser.json())

app.use((req, res, next) => {
    console.log("croosss conf");
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.post('/api/categories', (req, res, next) => {
    console.log(req);
    const categories = new Categories({
        ...req.body
      });
      categories.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
});
app.get('/api/categories', (req, res, next) => {
    Categories.find()
    .then(categories => res.status(200).json(categories))
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/categorie/:id', async (req, res, next) => {
    const categorie = await Categories.findOne({_id: req.params.id})
    return res.status(200).json(categorie);
});

app.post('/api/articles', (req, res, next) => {
    console.log(req);
    const articles = new Articles({
        ...req.body
    });
    articles.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
});

app.get('/api/articles', (req, res, next) => {
    Articles.find()
        .then(categories => res.status(200).json(categories))
        .catch(error => res.status(400).json({ error }));
});

module.exports = app;