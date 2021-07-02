'use stric'

const express = require('express'),
      app = express(),
      moongose = require('./Database'),
      RoutesFood = require('./Routes/Foods.Route'),
      RoutesOrders = require('./Routes/Orders.Route'),
      port = (process.env.PORT || 5000),
      morgan = require('morgan')

app.set('port',port)


app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

app.use(express.json())

app.use('/Foods',RoutesFood)
app.use('/Orders',RoutesOrders)
app.use('/images',express.static(__dirname+'/Images'))

app.listen(app.get('port'),()=>{
    console.log('server run')
})