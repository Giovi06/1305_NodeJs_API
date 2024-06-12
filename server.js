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

const whitelist = ['https://www.yoursite.com', 'http://127.0.0.1:5500', 'http://localhost:8080'];
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
app.use(express.static(path.join(__dirname, '/public')));

app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
});
app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
});
app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, 'new-page.html'); // 302 by default
});
// route handler
app.get('/hello(.html)?', (req, res, next) => {
    console.log('attempted to load hello.html');
    next()
}, (req, res) => {
    res.send('Hello World');
});
// chaining route handlers
const one = (req, res,next) => {
    console.log('one');
    next();
}
const two = (req, res,next) => {
    console.log('two');
    next();
}
const three = (req, res,next) => {
    console.log('three');
    res.send('Finished');
}
app.get('/chain(.html)?', [one, two, three]);

// app.use('/postapi', middlewares.isLoggedIn, postAPI);
// app.use(middlewares.checkTokenSetUser);

// function checkTokenSetUser(req, res, next) {
//     try {
//       const authHeader = req.get('authorization');
//       if (authHeader) {
//         const token = authHeader.split(' ')[1];
//         if (token) {
//           jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
//             if (error) {
//               console.log(error);
//               next();
//             }
//             req.user = user;
//             next();
//           });
//         } else {
//           next();
//         }
//       } else {
//         next();
//       }
//     } catch (error) {
//       console.log(error);
//       res.status(401);
//     }
//   }

// function isLoggedIn(req, res, next) {
//     try {
//       if (req.user) {
//         next();
//       } else {
//         const error = new Error('🚫 Un-Authorized 🚫');
//         res.status(401);
//         next(error);
//       }
//     } catch (error) {
//       res.status(401);
//       next(error);
//     }
//   }

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

// function notFound(req, res, next) {
//     try {
//       res.status(404);
//       const error = new Error('Not Found - ' + req.originalUrl);
//       next(error);
//     } catch (error) {
//       console.log('notFound', error);
//     }
//   }
  
//   function errorHandler(err, req, res, next) {
//     try {
//       res.status(res.statusCode || 500);
//       res.json({
//         message: err.message,
//         stack: err.stack
//       });
//     } catch (error) {
//       console.log('errorHandler', error);
//     }
//   }
  
//   app.use(errorHandler);
//   app.use(notFound);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
