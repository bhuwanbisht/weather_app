const path = require('path');
const hbs = require('hbs');
const express = require('express');
const app = express();

const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const publicDirectory = path.join(__dirname, '../public');

//Set up Handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectory))

//Will now work as we have defined index.html is it will run instead of it
/*app.get('/', (req, res) => {
    res.send('<h1>Hello Express!</h1>');
});
app.get('/help', (req, res) => {
    res.send('<h1>Help</h1>');
});
app.get('/about', (req, res) => {
    res.send([{
        'name': 'Testing',
        'number': '9988776655'
    },{
        'name': 'Testing2',
        'number': '9988776654'
    }]);
});
*/

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Testing'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {title:'About', name:'Testing About'});
});

app.get('/help', (req, res) => {
    res.render('help', {title: 'Help', name:'Testing Help'});
});

app.get('/weather', (req, res) => {
    const geocode = require('./util/geocode');
    const forecast = require('./util/forecast');
    
    if(!req.query.address) {
        return res.send({
            error: 'You must provide Address.'
        })
    }
    let address = req.query.address;
    geocode(address, function(error, { latitude, longitude, placeName } = {}) {
        if(error) {
            return res.send({
                error
            });
        } 
        forecast(latitude, longitude, function(errorForecast, { descriptions, temperature, feelslike} = {}) {
            if(errorForecast) {
                return res.send({
                    error: errorForecast
                });
            }
            res.send({
                'forecast': `${descriptions}. It is currently ${temperature} degress out. If feels like ${feelslike} degree out.`,
                'location': placeName,
                'address' : address
            });
        });
    });
    
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title:'Error Help',
        name: 'Testing Error',
        errormsg: 'Help artical not found.'
     });
});

app.get('*', (req, res) => {
    res.render('error', {
       title:'Error',
       name: 'Testing Error',
       errormsg: '404 Page not found.'
    });
});

app.listen(3000, () => {
    console.log("Server is up on port 3000.")
});

