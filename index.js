require('dotenv').config();

const CURRENCIES_OBJECT_TYPE_ID = process.env.CURRENCIES_OBJECT_TYPE_ID;

const hubspot_client = require('./hubspot_client');
const express = require('express');
const app = express();
const port = 3000;


app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (_, res) => res.render('homepage', {
  title: "List of currencies",
  data: await hubspot_client.getCurrencies()
}
));

app.get('/update-cobj', async (_, res) => res.render('update', {
  title: "Create currency",
}
));

app.post('/update-cobj', async (req, res) => {
  try {
    await hubspot_client.updateCurrency(req.body);
    res.redirect('/');
  } catch (error) {
    return res.status(500).send(request.error.response ? request.error.response.data : 'Error...');
  }
})

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
