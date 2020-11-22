const express = require('express')

const about = require('../../../../about')
const recipes = require('../../../../recipes')
const message = require('../../../../message')

const router = express.Router()


router.get("/", (req, res) => {
    return res.render("site/index", { items: about, recipes: recipes })
})

router.get("/about", (req, res) => {
    return res.render("site/about", { items: about, messages: message })
})

router.get("/recipes", (req, res) => {
    return res.render("site/recipes", { items: recipes })
})

router.get("/recipesid", (req, res) => {
    const id = req.query.id

    const recipe = recipes.find(function(menu) {
        if (menu.cardId == id) {
            return true
        }
    })

    if (!recipe) {
        return res.send('Recipe not found!')
    }

    return res.render("recipeid", { items: recipe })
})


module.exports = router