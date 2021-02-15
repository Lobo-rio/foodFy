const optionsDb = require('../../model/index')
const { fieldsCreate, valuesCreate } = require('../../../lib/utils')

module.exports = {
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

            return res.render("admin/recipes/list", { recipes })
        } catch (error) {
            console.error(error)
            return res.render("admin/recipes/list", {
                error: "Houve um error na consulta, favor voltar mas tarde!"
            })
        }
    },
    async create(req, res) {
        try {
            let table = 'chefs',
                options = 'ORDER BY name'

            const params = { table, options }

            let results = await optionsDb.all(params)
            const chefs = results.rows

            return res.render("admin/recipes/create", { chefs })
        } catch (error) {
            console.error(error)
        }
    },
    async show(req, res) {
        try {
            const { id } = req.params
            let table = 'chefs',
                tableJoin = 'recipes',
                idJoin = 'chef_id',
                params = ''


            params = { id, table, tableJoin, idJoin }
            let result = await optionsDb.findJoinBy(params)
            const recipe = result.rows[0]

            recipe.ingredients = recipe.ingredients.replace('{"', "")
            recipe.ingredients = recipe.ingredients.replace('"}', "")
            recipe.ingredients = recipe.ingredients.split('","')

            recipe.preparation = recipe.preparation.replace('{"', "")
            recipe.preparation = recipe.preparation.replace('"}', "")
            recipe.preparation = recipe.preparation.split('","')

            return res.render("admin/recipes/show", { recipe })
        } catch (error) {
            console.error(error)
            return res.render("admin/chefs/list", {
                error: "Houve um error na consulta, favor voltar mas tarde!"
            })
        }
    },
    async edit(req, res) {
        try {
            const { id } = req.params
            let table = 'chefs',
                tableJoin = 'recipes',
                idJoin = 'chef_id',
                filterQuery = `WHERE id = ${id}`,
                params = ''

            params = { table, tableJoin, idJoin, filterQuery }
            let result = await optionsDb.findJoin(params)
            const recipe = result.rows[0]

            recipe.ingredients = recipe.ingredients.replace('{"', "")
            recipe.ingredients = recipe.ingredients.replace('"}', "")
            recipe.ingredients = recipe.ingredients.split('","')

            recipe.preparation = recipe.preparation.replace('{"', "")
            recipe.preparation = recipe.preparation.replace('"}', "")
            recipe.preparation = recipe.preparation.split('","')

            table = 'chefs'
            options = 'ORDER BY name'
            params = { table, options }

            let results = await optionsDb.all(params)
            const chefs = results.rows

            res.render("admin/recipes/edit", { recipe, chefs })
        } catch (error) {
            console.error(error)
            return res.render("admin/chefs/list", {
                error: "Houve um error na edição do chef, favor voltar mas tarde!"
            })
        }
    },
    async save(req, res) {
        try {
            const keys = Object.keys(req.body)
            let table = 'recipes',
                filterQuery = 'ORDER BY title',
                fields = fieldsCreate(req.body),
                values = valuesCreate(fields),
                params = ''

            for (key of keys) {
                if (req.body[key] == "") {
                    return res.render("admin/recipes/create", {
                        chef: req.body,
                        error: 'Por favor, preencher todo os campos!'
                    })
                }
            }

            const data = [
                req.body.image,
                req.body.title,
                req.body.chef_id,
                req.body.ingredients,
                req.body.preparation,
                req.body.information
            ]

            params = { fields, values, table, data }
            await optionsDb.save(params)

            let tableJoin = 'recipes',
                idJoin = 'chef_id'


            table = 'chefs'
            params = { table, tableJoin, idJoin, filterQuery }
            let results = await optionsDb.findJoin(params)
            const recipes = results.rows


            return res.render("admin/recipes/list", {
                recipes,
                success: "A Receita, foi salva com sucesso!"
            })
        } catch (error) {
            console.error(error)
            return res.render("admin/recipes/list", {
                error: "Houve um error na hora de Salvar, favor voltar mas tarde!"
            })
        }

    },
    async update(req, res) {
        try {
            const keys = Object.keys(req.body)
            let table = 'recipes',
                filterQuery = 'ORDER BY title',
                params = ''

            for (key of keys) {
                if (req.body[key] == "") {
                    return res.render("chefs/edit", {
                        chef: req.body,
                        error: 'Por favor, preencher todo os campos!'
                    })
                }
            }

            const query = `
                UPDATE recipes SET
                image = ($1),
                title = ($2),
                chef_id = ($3),
                ingredients = ($4),
                preparation = ($5),
                information = ($6)
                WHERE id = $7
            `

            const data = [
                req.body.image,
                req.body.title,
                req.body.chef_id,
                req.body.ingredients,
                req.body.preparation,
                req.body.information,
                req.body.id
            ]

            params = { query, data }
            await optionsDb.update(params)

            let tableJoin = 'recipes',
                idJoin = 'chef_id'


            table = 'chefs'
            params = { table, tableJoin, idJoin, filterQuery }
            let results = await optionsDb.findJoin(params)
            const recipes = results.rows

            return res.render("admin/recipes/list", {
                recipes,
                success: "A receita, foi alterada com sucesso!"
            })
        } catch (error) {
            console.error(error)
            return res.render("admin/recipes/list", {
                error: "Houve um error no Update, favor voltar mas tarde!"
            })
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.params
            let table = 'recipes',
                filterQuery = 'ORDER BY title',
                params = ''

            params = { id, table }
            await optionsDb.delete(params)

            let tableJoin = 'recipes',
                idJoin = 'chef_id'


            table = 'chefs'
            params = { table, tableJoin, idJoin, filterQuery }
            let results = await optionsDb.findJoin(params)
            const recipes = results.rows

            return res.render("admin/recipes/list", {
                recipes,
                success: "O Chef, foi alterado com sucesso!"
            })
        } catch (error) {
            console.error(error)
            return res.render("admin/recipes/list", {
                error: "Error ao tentar deletar, favor voltar mas tarde!!"
            })
        }
    }
}