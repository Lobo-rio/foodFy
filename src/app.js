const express = require('express')
const nunjucks = require('nunjucks')
const methodOverride = require('method-override')

const router = require('./app/router/index')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))

app.set("view engine", "njk")
app.use(router)

nunjucks.configure("src/app/views", {
    express: app,
    autoescape: false,
    noCache: true
})

app.use(function(req, res) {
    res.status(404).render("site/not-found");
});


app.listen(5000, () => {
    console.log('Server is running port 5000!')
})