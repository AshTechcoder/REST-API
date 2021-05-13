
const express = require('express');
const app = express();
const ProductRoute = require('./Routes/Product.route');
const mongoose = require('mongoose');
const createError = require('http-errors');


//// Middleware for json post request
app.use(express.json());


//// Middleware for urlencoded post request
app.use(express.urlencoded({extended: true}));



// killer
// NlAX1l9jrt3JwFfW
// mongodb+srv://killer:<password>@cluster0.94pub.mongodb.net/<dbname>?retryWrites=true&w=majority
//// MongoDB Connection....
mongoose.connect('mongodb+srv://cluster0.94pub.mongodb.net/', 
    {
        dbName:'RestApi',
        user: 'killer',
        pass: 'NlAX1l9jrt3JwFfW',
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
    console.log('Mongodb connected...')
});



///// Testing Routes
app.all('/test', (req, res) =>{
    // console.log(req.query);
    // res.send(req.query);
    // console.log(req.params);
    // res.send(req.params);
    console.log(req.body);
    res.send(req.body);
});



///// Routes
app.use('/products', ProductRoute);



///// 404 Error handling 
app.use((req, res, next) => {
    // const err = new Error('Not found');
    // err.status = 404;
    next(createError(404, 'Not found'));
})


///// Error handler
app.use((err, req, res, next) => {
     res.status(err.status || 500);
     res.send({
         error:{
             status: err.status || 500,
             message: err.message
         }
     });
});



////Listen on port 3000
app.listen(3000, () => {
    console.log('sever is started..');
});