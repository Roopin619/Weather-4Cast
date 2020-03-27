const express = require("express");
const hbs = require("hbs");
const geocode = require(__dirname + "/utils/geocode");
const forecast = require(__dirname + "/utils/forecast");
const reverseGeocode = require(__dirname + "/utils/reverse-geocode");

const app = express();

app.set('view engine', 'hbs');
app.use(express.static('public'));
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res) => {
  res.render('index', { title: 'Weather 4Cast' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Me' });
});

app.get('/help', (req, res) => {
  res.render('help', { title: 'Help' });
});

app.get('/weather', (req, res) => {
  if (!req.query.address && !req.query.lat) {
    return res.send({
      error: 'You must provide an address!'
    });
  }

  if (req.query.address) {
    geocode(req.query.address, (error, data) => {
      if (error) {
        return res.send({ error });
      }

      forecast(data.latitude, data.longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecastData,
          location: data.location
        });
      });

    });

  } else {
    const latitude = parseFloat(req.query.lat);
    const longitude = parseFloat(req.query.long);

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      reverseGeocode(latitude, longitude, (error, location) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecastData,
          location
        });
      });

    });
  }
  
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started running successfully.')
});