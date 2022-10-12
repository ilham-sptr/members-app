const express = require('express')
const path = require('path')
const exphbs  = require('express-handlebars');
const app = express();
const members = require('./Members')
// const logger = require('./middleware/logger')

// Init middleware
// app.use(logger)

// HandleBars Middleware
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Homepage Route
app.get('/', (req, res) => res.render('index', {
    page: "Home",
    body: "Member App",
    members
}))

// Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// Set static folder
app.use(express.static(path.join(__dirname, "public")))

app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))