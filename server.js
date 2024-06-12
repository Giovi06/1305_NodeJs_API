const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const {logger} = require('./middleware/LogEvents');
const errorHandler = require('./middleware/errorHandler');
const { error } = require('console');


const PORT = process.env.PORT || 8080;

//custom middleware logger
app.use(logger);

const whitelist = ['http://127.0.0.1:5500', 'http://localhost:8080'];
const corsOption = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1 || !origin ) {
            callback(null, true)
        }else{
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOption));

// built-in middleware to handle urlencoded data
// in other words, form data:  
// ‘content-type: application/x-www-form-urlencoded’
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public')));

//routess
app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/employees', require('./routes/api/employees'));

//default /all
app.all('*',(req, res) => {
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    }
    if(req.accepts('json')){
        res.json({ error : "404 Not Found"});
    }else {
        res.type('txt').send("404 Not Found");
    }  
});
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
