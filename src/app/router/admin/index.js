const express = require('express')
const router = express.Router()
const chefs = require('../../controllers/admin/chefs.js')
const recipes = require('../../controllers/admin/recipes')

router.get('/admin', chefs.list)

router.get('/admin/chefs', chefs.list)
router.get('/admin/chefs/create', chefs.create)
router.get('/admin/chefs/:id/details', chefs.show)
router.get('/admin/chefs/:id/edit', chefs.edit)
router.get('/admin/chefs/:id/delete', chefs.delete)

router.post('/admin/chefs', chefs.save)
router.put('/admin/chefs', chefs.update)



router.get('/admin/recipes', recipes.list)
router.get('/admin/recipes/create', recipes.create)
router.get('/admin/recipes/:id/show', recipes.show)
router.get('/admin/recipes/:id/edit', recipes.edit)
router.get('/admin/recipes/:id/delete', recipes.delete)

router.post('/admin/recipes', recipes.save)
router.put('/admin/recipes', recipes.update)
module.exports = router