const optionsDb = require('../../model/index')

const about = require('../../../../about')
const message = require('../../../../message')
const { search } = require('../../model/index')

module.exports = {
    async index(req, res) {

        try {
            let table = 'chefs',
                tableJoin = 'recipes',
                idJoin = 'chef_id',
                filterQuery = 'ORDER BY title',
                params = ''

            params = { table, tableJoin, idJoin, filterQuery }
            let results = await optionsDb.findJoin(params)
            const recipes = results.rows

            return res.render("site/index", { items: about, recipes })
        } catch (error) {
            console.log(error)
        }

    },
    about(req, res) {
        return res.render("site/about", { items: about, messages: message })
    },
    async list(req, res) {
        try {
            let table = 'chefs',
                tableJoin = 'recipes',
                idJoin = 'chef_id',
                filterQuery = 'ORDER BY title',
                params = ''

            params = { table, tableJoin, idJoin, filterQuery }
            let results = await optionsDb.findJoin(params)
            const recipes = results.rows

            return res.render("site/recipes", { recipes })
        } catch (error) {
            console.log(error)
        }
    },
    async show(req, res) {

        try {
            const { id } = req.query
            console.log(id)
            let table = 'chefs',
                tableJoin = 'recipes',
                idJoin = 'chef_id',
                params = ''

            params = { id, table, tableJoin, idJoin }

            let results = await optionsDb.findJoinBy(params)
            const recipe = results.rows[0]

            recipe.ingredients = recipe.ingredients.replace('{"', "")
            recipe.ingredients = recipe.ingredients.replace('"}', "")
            recipe.ingredients = recipe.ingredients.split('","')

            recipe.preparation = recipe.preparation.replace('{"', "")
            recipe.preparation = recipe.preparation.replace('"}', "")
            recipe.preparation = recipe.preparation.split('","')

            return res.render("site/recipeid", { recipe })
        } catch (error) {
            console.log(error)
        }

    },
    async search(req, res) {
        try {
            const { filter } = req.body
            let table = 'chefs',
                tableJoin = 'recipes',
                idJoin = 'chef_id',
                params = ''


            params = { filter, table, tableJoin, idJoin }
            let result = await optionsDb.findJoinSearch(params)
            const recipes = result.rows

            return res.render("site/search", { recipes, filter })
        } catch (error) {
            console.log(error)
        }
    },
    async chefs(req, res) {
        try {
            let table = 'chefs',
                tableJoin = 'recipes',
                idJoin = 'chef_id',
                params = ''

            params = { table, tableJoin, idJoin }
            let results = await optionsDb.findJoinCounterAll(params)
            const chefs = results.rows

            return res.render("site/chefs", { chefs })
        } catch (error) {
            console.log(error)
        }
    }
}