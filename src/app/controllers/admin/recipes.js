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
                filterQuery = `WHERE id = ${id}`,
                params = ''

            params = { table, tableJoin, idJoin, filterQuery }
            let result = await optionsDb.findJoin(params)
            const recipe = result.rows[0]

            recipe.ingredients = recipe.ingredients.split(",")
            recipe.preparation = recipe.preparation.split(",")

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

            recipe.ingredients = recipe.ingredients.split(",")
            recipe.preparation = recipe.preparation.split(",")

            table = 'chefs'
            options = 'ORDER BY name'
            params = { table, options }

            let results = await optionsDb.all(params)
            const chefs = results.rows

            console.log(recipe)

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
            let table = 'chefs',
                tableJoin = 'recipes',
                idJoin = 'chef_id',
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

            params = { table, tableJoin, idJoin, filterQuery }
            let results = await optionsDb.findJoin(params)
            const recipes = results.rows

            console.log(recipes)
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
            let table = 'chefs',
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
                UPDATE chefs SET
                    name = ($1),
                    avatar = ($2)
                    WHERE id = $3
            `

            const data = [
                req.body.name,
                req.body.avatar,
                req.body.id
            ]

            params = { query, data }
            await optionsDb.update(params)

            let options = 'ORDER BY name'
            params = { table, options }
            let results = await optionsDb.all(params)
            const chefs = results.rows

            return res.render("admin/chefs/show", {
                chefs,
                success: "O Chef, foi alterado com sucesso!"
            })
        } catch (error) {
            console.error(error)
            return res.render("admin/chefs/show", {
                error: "Houve um error no Update, favor voltar mas tarde!"
            })
        }
    },
    delete(req, res) {
        try {} catch (error) {
            console.error(error)
            return res.render("users/index", {
                error: "Error ao tentar deletar sua conta!"
            })
        }
    }
}