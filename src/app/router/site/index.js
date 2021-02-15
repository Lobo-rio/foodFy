const express = require('express')

const site = require('../../controllers/site/index')

const router = express.Router()

router.get("/", site.index)
router.get("/about", site.about)
router.get("/recipes", site.list)
router.get("/recipesid", site.show)
router.get("/chefs", site.chefs)
router.post("/search", site.search)

module.exports = router