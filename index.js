//Stock Market Portfolio App Pratice



const express = require('express')
const app = express()
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');

const PORT = process.env.PORT || 5000;


//connecting to api 
// Public api key pk_e3a65e804c4b49f38d873236fc222daf

//Create call api function
function call_api(finishedApi){
request('https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_e3a65e804c4b49f38d873236fc222daf', {json: true}, (err, res, body) => {
    if(err) {return console.log(err);}
    console.log(body);
    if (res.statusCode === 200){
       //onsole.log(body);
       finishedApi(body);
    };
});
};



//Set handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Set handlebar routes 
app.get('/', function (req, res) {
    call_api(function(doneAPI){
           res.render('home', {
           Stock: doneAPI
    });

    });
 
});

// create about page route
app.get('/about.html', function (req, res) {
    res.render('about');
});


//Set static folder 
app.use(express.static(path.join(__dirname, 'public')));



app.listen(PORT, () => console.log('server Listening on port ' + PORT ));