// define port
const port = 3000

// require express
const express = require('express')
const app = express()

// require express-handlebars
const exphbs = require('express-handlebars')

// require restaurant data
const allRestaurantData = require('./restaurant.json')

// set template engine
app.engine('handlebars', exphbs( {defaultLayout: 'main'} ))
app.set('view engine', 'handlebars')

// set static files (this place puts css, jquery and popper files)
app.use(express.static('public'))

// set routes (each template has its own css)
app.get('/', (req, res) => {
    const cssStyle = 'index'
    res.render('index', {
        restaurant: allRestaurantData.results,
        css: 'index.css'
    })
})

app.get('/restaurants/:id', (req, res) => {
    const cssStyle = 'show'
    let eachRestaurantData = allRestaurantData.results.find((restaurant) => {
        return restaurant.id.toString() === req.params.id.toString()
    })
    res.render('show', {
        restaurant: eachRestaurantData,
        css: 'show.css'
    })
})

app.get('/search', (req, res) => {
    const cssStyle = 'index'
    let searchRestaurant = allRestaurantData.results.filter((restaurant) => {
        return restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase())
    })
    console.log(req.query.keyword)
    res.render('index', {
        restaurant: searchRestaurant,
        css: 'index.css',
        value: req.query.keyword
    })
})

// listen and launch server
app.listen(port,() => {
    console.log(`nodemon is listening http://localhost/${port}`)
})