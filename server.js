import * as dotenv from 'dotenv'
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config()

const app = express();
const port = process.env.PORT || 3000;

/**
 * Adding headers to our requests.
 */
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      return res.status(200).json({});
    }
    next();
});

//serve home directory files as static content at the root url
app.use('/', express.static(__dirname + '/home'));
app.use('/app', express.static(__dirname + '/app'));

//use ejs view engine for dApp files
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'app'));

// app.get('/app', (req, res) => {
//   res.render('index', { name: 'Monroe' })
// })


app.listen(port);

app.use((req, res, next) => {
    const error = Error("Not found");
    res.statusCode = 404;
    res.send({ error: error.message });
});

console.log('SwapUp frontend server started on: ' + port);